<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\TransactionLog;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $productStats = [
            'total' => Product::count(),
            'active' => Product::where('status', 'active')->count(),
            'draft' => Product::where('status', 'draft')->count(),
            'out_of_stock' => Product::where('stock', '<=', 0)->count(),
        ];

        $orderStats = [
            'total' => Order::count(),
            'pending' => Order::where('status', 'pending')->count(),
            'processing' => Order::where('status', 'processing')->count(),
            'completed' => Order::whereIn('status', ['shipped', 'delivered'])->count(),
            'revenue' => Order::whereIn('status', ['shipped', 'delivered'])->sum('total'),
        ];

        $transactionStats = [
            'today' => TransactionLog::whereDate('created_at', today())->count(),
            'this_week' => TransactionLog::where('created_at', '>=', now()->startOfWeek())->count(),
            'total' => TransactionLog::count(),
            'recent' => TransactionLog::orderBy('created_at', 'desc')->limit(5)->get(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'productStats' => $productStats,
            'orderStats' => $orderStats,
            'transactionStats' => $transactionStats,
        ]);
    }
}
