<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\TransactionLog;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected string $modelClass = Order::class;

    protected string $routePrefix = 'admin.orders';

    protected string $viewPrefix = 'Admin/Orders';

    protected int $perPage = 5;

    protected array $validationRules = [
        'customer_name' => 'required|string|max:255',
        'customer_email' => 'required|email|max:255',
        'customer_phone' => 'nullable|string|max:50',
        'shipping_address' => 'nullable|string',
        'status' => 'required|in:pending,processing,shipped,delivered,cancelled,refunded',
        'payment_status' => 'required|in:unpaid,paid,failed,refunded',
        'payment_method' => 'nullable|string|max:100',
        'payment_reference' => 'nullable|string|max:255',
        'notes' => 'nullable|string',
    ];

    protected array $filterableFields = ['search', 'status', 'payment_status'];

    public function index(Request $request)
    {
        $query = Order::query()->with('items');
        $query = $this->applyFilters($query, $request);
        $orders = $query->orderBy('created_at', 'desc')->paginate($this->perPage)->withQueryString();

        $stats = $this->getOrderStats();

        return inertia($this->viewPrefix.'/Index', [
            'orders' => $orders,
            'stats' => $stats,
            'filters' => $this->getFilters($request),
        ]);
    }

    public function create()
    {
        $products = Product::where('status', 'active')->where('stock', '>', 0)->get(['id', 'name', 'price', 'stock']);

        return inertia($this->viewPrefix.'/Create', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateRequest($request);

        $items = $request->input('items', []);
        if (empty($items)) {
            return redirect()->back()->withErrors(['items' => 'Minimal harus ada 1 item']);
        }

        $validated['order_number'] = Order::generateOrderNumber();
        $validated['subtotal'] = 0;
        $validated['shipping_cost'] = $request->input('shipping_cost', 0);
        $validated['tax'] = $request->input('tax', 0);

        $order = Order::create($validated);

        $subtotal = 0;
        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'] ?? null,
                'product_name' => $item['product_name'],
                'product_sku' => $item['product_sku'] ?? null,
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['quantity'] * $item['price'],
            ]);
            $subtotal += $item['quantity'] * $item['price'];
        }

        $order->update([
            'subtotal' => $subtotal,
            'total' => $subtotal + $validated['shipping_cost'] + $validated['tax'],
        ]);

        TransactionLog::logOrder(
            TransactionLog::ACTION_CREATE,
            $order,
            null,
            $validated,
            'Admin'
        );

        return $this->redirectWithSuccess('Pesanan berhasil dibuat');
    }

    public function show(Order $order)
    {
        $order->load('items');

        return inertia($this->viewPrefix.'/Show', [
            'order' => $order,
        ]);
    }

    public function edit(Order $order)
    {
        $order->load('items');
        $products = Product::where('status', 'active')->where('stock', '>', 0)->get(['id', 'name', 'price', 'stock']);

        return inertia($this->viewPrefix.'/Edit', [
            'order' => $order,
            'products' => $products,
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $this->validateRequest($request, $order->id);

        $items = $request->input('items', []);
        if (empty($items)) {
            return redirect()->back()->withErrors(['items' => 'Minimal harus ada 1 item']);
        }

        $oldValues = $order->toArray();
        $oldValues['items'] = $order->items->toArray();

        $validated['subtotal'] = 0;
        $validated['shipping_cost'] = $request->input('shipping_cost', 0);
        $validated['tax'] = $request->input('tax', 0);

        $order->update($validated);

        $order->items()->delete();
        $subtotal = 0;
        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'] ?? null,
                'product_name' => $item['product_name'],
                'product_sku' => $item['product_sku'] ?? null,
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['quantity'] * $item['price'],
            ]);
            $subtotal += $item['quantity'] * $item['price'];
        }

        $order->update([
            'subtotal' => $subtotal,
            'total' => $subtotal + $validated['shipping_cost'] + $validated['tax'],
        ]);

        $newValues = $order->toArray();
        $newValues['items'] = $items;

        TransactionLog::logOrder(
            TransactionLog::ACTION_UPDATE,
            $order,
            $oldValues,
            $newValues,
            'Admin'
        );

        return $this->redirectWithSuccess('Pesanan berhasil diperbarui');
    }

    public function updateStatus(Request $request, Order $order)
    {
        $status = $request->input('status');

        $oldValues = ['status' => $order->status];

        $updateData = ['status' => $status];

        if ($status === 'shipped' && ! $order->shipped_at) {
            $updateData['shipped_at'] = now();
        }

        if ($status === 'delivered' && ! $order->delivered_at) {
            $updateData['delivered_at'] = now();
        }

        if ($status === 'paid' && ! $order->paid_at) {
            $updateData['paid_at'] = now();
        }

        $order->update($updateData);

        $newValues = ['status' => $status];

        TransactionLog::logOrder(
            TransactionLog::ACTION_STATUS_CHANGE,
            $order,
            $oldValues,
            $newValues,
            'Admin'
        );

        return redirect()->back()->with('success', 'Status pesanan berhasil diperbarui');
    }

    public function updatePayment(Request $request, Order $order)
    {
        $validated = $request->validate([
            'payment_status' => 'required|in:unpaid,paid,failed,refunded',
            'payment_method' => 'nullable|string|max:100',
            'payment_reference' => 'nullable|string|max:255',
        ]);

        $oldValues = [
            'payment_status' => $order->payment_status,
            'payment_method' => $order->payment_method,
        ];

        if ($validated['payment_status'] === 'paid' && ! $order->paid_at) {
            $validated['paid_at'] = now();
        }

        $order->update($validated);

        TransactionLog::logPayment(
            TransactionLog::ACTION_PAYMENT,
            $order,
            $oldValues,
            $validated,
            'Admin'
        );

        return redirect()->back()->with('success', 'Status pembayaran berhasil diperbarui');
    }

    public function destroy(Order $order)
    {
        $oldValues = $order->toArray();
        $oldValues['items'] = $order->items->toArray();

        TransactionLog::logOrder(
            TransactionLog::ACTION_DELETE,
            $order,
            $oldValues,
            null,
            'Admin'
        );

        $order->items()->delete();
        $order->delete();

        return $this->redirectWithSuccess('Pesanan berhasil dihapus');
    }

    protected function getOrderStats(): array
    {
        return [
            'total' => Order::count(),
            'pending' => Order::where('status', 'pending')->count(),
            'processing' => Order::where('status', 'processing')->count(),
            'completed' => Order::whereIn('status', ['shipped', 'delivered'])->count(),
            'revenue' => Order::whereIn('status', ['shipped', 'delivered'])->sum('total'),
        ];
    }

    protected function redirectWithSuccess(string $message, ?string $redirectTo = null)
    {
        $redirectTo = $redirectTo ?? route($this->routePrefix.'.index');

        return redirect($redirectTo)->with('success', $message);
    }
}
