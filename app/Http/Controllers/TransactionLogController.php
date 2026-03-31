<?php

namespace App\Http\Controllers;

use App\Models\TransactionLog;
use Illuminate\Http\Request;

class TransactionLogController extends Controller
{
    protected string $modelClass = TransactionLog::class;

    protected string $routePrefix = 'admin.transactions';

    protected string $viewPrefix = 'Admin/Transactions';

    protected int $perPage = 5;

    protected array $filterableFields = ['search', 'type', 'action'];

    public function index(Request $request)
    {
        $query = TransactionLog::query();
        $query = $this->applyFilters($query, $request);
        $logs = $query->orderBy('created_at', 'desc')->paginate($this->perPage)->withQueryString();

        $stats = $this->getTransactionStats();

        return inertia($this->viewPrefix.'/Index', [
            'logs' => $logs,
            'stats' => $stats,
            'filters' => $this->getFilters($request),
        ]);
    }

    public function show(TransactionLog $transaction)
    {
        return inertia($this->viewPrefix.'/Show', [
            'log' => $transaction,
        ]);
    }

    public function getRecentLogs($limit = 10)
    {
        return TransactionLog::orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    protected function getTransactionStats(): array
    {
        $today = now()->startOfDay();
        $yesterday = now()->subDay()->startOfDay();
        $thisWeek = now()->startOfWeek();

        $todayCount = TransactionLog::where('created_at', '>=', $today)->count();
        $yesterdayCount = TransactionLog::where('created_at', '>=', $yesterday)
            ->where('created_at', '<', $today)
            ->count();
        $weekCount = TransactionLog::where('created_at', '>=', $thisWeek)->count();
        $totalCount = TransactionLog::count();

        $productActions = TransactionLog::where('type', TransactionLog::TYPE_PRODUCT)->count();
        $orderActions = TransactionLog::where('type', TransactionLog::TYPE_ORDER)->count();
        $paymentActions = TransactionLog::where('type', TransactionLog::TYPE_PAYMENT)->count();

        return [
            'today' => $todayCount,
            'yesterday' => $yesterdayCount,
            'this_week' => $weekCount,
            'total' => $totalCount,
            'by_type' => [
                'product' => $productActions,
                'order' => $orderActions,
                'payment' => $paymentActions,
            ],
        ];
    }

    public function getDashboardStats()
    {
        return response()->json([
            'stats' => $this->getTransactionStats(),
            'recent_logs' => $this->getRecentLogs(5),
        ]);
    }
}
