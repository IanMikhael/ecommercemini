<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\TransactionLog;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected string $modelClass = Product::class;

    protected string $routePrefix = 'admin.products';

    protected string $viewPrefix = 'Admin/Products';

    protected int $perPage = 5;

    protected array $validationRules = [
        'name' => 'required|string|max:255',
        'slug' => 'nullable|string|max:255|unique:products,slug,:id',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
        'original_price' => 'nullable|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'sku' => 'nullable|string|max:100|unique:products,sku,:id',
        'image' => 'nullable|string|max:500',
        'category' => 'nullable|string|max:100',
        'status' => 'required|in:active,draft,archived',
        'plant_type' => 'required|in:indoor,outdoor,both',
        'scientific_name' => 'nullable|string|max:255',
        'light_requirement' => 'nullable|string|max:100',
        'water_requirement' => 'nullable|string|max:100',
        'care_instructions' => 'nullable|string',
        'is_featured' => 'boolean',
    ];

    protected array $filterableFields = ['search', 'status', 'category', 'plant_type'];

    public function index(Request $request)
    {
        $query = Product::query();
        $query = $this->applyFilters($query, $request);
        $products = $query->orderBy('created_at', 'desc')->paginate($this->perPage)->withQueryString();

        $stats = $this->getProductStats();

        return inertia($this->viewPrefix.'/Index', [
            'products' => $products,
            'stats' => $stats,
            'filters' => $this->getFilters($request),
        ]);
    }

    public function create()
    {
        return inertia($this->viewPrefix.'/Create', [
            'categories' => $this->getCategories(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateRequest($request);
        $validated = $this->prepareData($validated);

        $product = Product::create($validated);

        TransactionLog::logProduct(
            TransactionLog::ACTION_CREATE,
            $product,
            null,
            $validated,
            'Admin'
        );

        return $this->redirectWithSuccess('Produk berhasil ditambahkan');
    }

    public function edit(Product $product)
    {
        return inertia($this->viewPrefix.'/Edit', [
            'product' => $product,
            'categories' => $this->getCategories(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $this->validateRequest($request, $product->id);
        $validated = $this->prepareData($validated);

        $oldValues = $product->toArray();

        $product->update($validated);

        TransactionLog::logProduct(
            TransactionLog::ACTION_UPDATE,
            $product,
            $oldValues,
            $validated,
            'Admin'
        );

        return $this->redirectWithSuccess('Produk berhasil diperbarui');
    }

    public function destroy(Product $product)
    {
        $oldValues = $product->toArray();

        TransactionLog::logProduct(
            TransactionLog::ACTION_DELETE,
            $product,
            $oldValues,
            null,
            'Admin'
        );

        $product->delete();

        return $this->redirectWithSuccess('Produk berhasil dihapus');
    }

    public function toggleFeatured(Product $product)
    {
        $oldValues = ['is_featured' => $product->is_featured];
        $newValues = ['is_featured' => ! $product->is_featured];

        $product->update(['is_featured' => ! $product->is_featured]);

        TransactionLog::logProduct(
            'toggle_featured',
            $product,
            $oldValues,
            $newValues,
            'Admin'
        );

        $message = $product->is_featured
            ? 'Produk ditampilkan di fitur'
            : 'Produk dihapus dari fitur';

        return redirect()->back()->with('success', $message);
    }

    protected function getCategories(): array
    {
        return [
            ['value' => 'succulents', 'label' => 'Succulents'],
            ['value' => 'tropical', 'label' => 'Tropical Plants'],
            ['value' => 'herbs', 'label' => 'Herbs'],
            ['value' => 'ferns', 'label' => 'Ferns'],
            ['value' => 'flowering', 'label' => 'Flowering Plants'],
            ['value' => 'air_plants', 'label' => 'Air Plants'],
            ['value' => 'pots', 'label' => 'Pots & Planters'],
            ['value' => 'tools', 'label' => 'Tools & Accessories'],
        ];
    }

    protected function getProductStats(): array
    {
        return [
            'total' => Product::count(),
            'active' => Product::where('status', 'active')->count(),
            'draft' => Product::where('status', 'draft')->count(),
            'out_of_stock' => Product::where('stock', '<=', 0)->count(),
        ];
    }

    protected function redirectWithSuccess(string $message, ?string $redirectTo = null)
    {
        $redirectTo = $redirectTo ?? route($this->routePrefix.'.index');

        return redirect($redirectTo)->with('success', $message);
    }
}
