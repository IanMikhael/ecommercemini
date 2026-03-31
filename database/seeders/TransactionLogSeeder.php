<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\TransactionLog;
use Illuminate\Database\Seeder;

class TransactionLogSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();
        $orders = Order::all();

        $logs = [
            [
                'type' => TransactionLog::TYPE_PRODUCT,
                'action' => TransactionLog::ACTION_CREATE,
                'reference_id' => $products->first()->id ?? 1,
                'reference_number' => 'Monstera Deliciosa',
                'description' => 'Menambah produk baru: Monstera Deliciosa',
                'old_values' => null,
                'new_values' => [
                    'name' => 'Monstera Deliciosa',
                    'price' => 350000,
                    'stock' => 25,
                    'status' => 'active',
                ],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_PRODUCT,
                'action' => TransactionLog::ACTION_UPDATE,
                'reference_id' => $products->first()->id ?? 1,
                'reference_number' => 'Monstera Deliciosa',
                'description' => 'Memperbarui produk: Monstera Deliciosa',
                'old_values' => ['stock' => 25, 'status' => 'draft'],
                'new_values' => ['stock' => 30, 'status' => 'active'],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_PRODUCT,
                'action' => 'toggle_featured',
                'reference_id' => $products->first()->id ?? 1,
                'reference_number' => 'Monstera Deliciosa',
                'description' => 'Mengubah status fitur produk: Monstera Deliciosa',
                'old_values' => ['is_featured' => false],
                'new_values' => ['is_featured' => true],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_ORDER,
                'action' => TransactionLog::ACTION_CREATE,
                'reference_id' => $orders->first()->id ?? 1,
                'reference_number' => 'ORD-20260320-0001',
                'description' => 'Membuat pesanan baru: ORD-20260320-0001',
                'old_values' => null,
                'new_values' => [
                    'customer_name' => 'Budi Santoso',
                    'total' => 750000,
                    'status' => 'pending',
                ],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_ORDER,
                'action' => TransactionLog::ACTION_STATUS_CHANGE,
                'reference_id' => $orders->first()->id ?? 1,
                'reference_number' => 'ORD-20260320-0001',
                'description' => 'Mengubah status pesanan: ORD-20260320-0001',
                'old_values' => ['status' => 'pending'],
                'new_values' => ['status' => 'processing'],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_ORDER,
                'action' => TransactionLog::ACTION_STATUS_CHANGE,
                'reference_id' => $orders->first()->id ?? 1,
                'reference_number' => 'ORD-20260320-0001',
                'description' => 'Mengubah status pesanan: ORD-20260320-0001',
                'old_values' => ['status' => 'processing'],
                'new_values' => ['status' => 'shipped'],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_PAYMENT,
                'action' => TransactionLog::ACTION_PAYMENT,
                'reference_id' => $orders->first()->id ?? 1,
                'reference_number' => 'ORD-20260320-0001',
                'description' => 'Update pembayaran pesanan: ORD-20260320-0001 - Status: paid',
                'old_values' => ['payment_status' => 'unpaid'],
                'new_values' => [
                    'payment_status' => 'paid',
                    'payment_method' => 'bank_transfer',
                    'payment_reference' => 'TRF-123456',
                ],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_ORDER,
                'action' => TransactionLog::ACTION_UPDATE,
                'reference_id' => $orders->skip(1)->first()->id ?? 2,
                'reference_number' => 'ORD-20260320-0002',
                'description' => 'Memperbarui pesanan: ORD-20260320-0002',
                'old_values' => [
                    'customer_phone' => '',
                    'shipping_address' => '',
                ],
                'new_values' => [
                    'customer_phone' => '081234567890',
                    'shipping_address' => 'Jl. Sudirman No. 123, Jakarta',
                ],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_ORDER,
                'action' => TransactionLog::ACTION_CREATE,
                'reference_id' => $orders->skip(2)->first()->id ?? 3,
                'reference_number' => 'ORD-20260319-0003',
                'description' => 'Membuat pesanan baru: ORD-20260319-0003',
                'old_values' => null,
                'new_values' => [
                    'customer_name' => 'Siti Aminah',
                    'total' => 520000,
                    'status' => 'pending',
                ],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_PRODUCT,
                'action' => TransactionLog::ACTION_CREATE,
                'reference_id' => $products->skip(1)->first()->id ?? 2,
                'reference_number' => 'Echeveria Elegans',
                'description' => 'Menambah produk baru: Echeveria Elegans',
                'old_values' => null,
                'new_values' => [
                    'name' => 'Echeveria Elegans',
                    'price' => 85000,
                    'stock' => 50,
                    'status' => 'active',
                ],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_PRODUCT,
                'action' => TransactionLog::ACTION_UPDATE,
                'reference_id' => $products->skip(1)->first()->id ?? 2,
                'reference_number' => 'Echeveria Elegans',
                'description' => 'Memperbarui produk: Echeveria Elegans',
                'old_values' => ['price' => 85000, 'stock' => 50],
                'new_values' => ['price' => 95000, 'stock' => 45],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_ORDER,
                'action' => TransactionLog::ACTION_STATUS_CHANGE,
                'reference_id' => $orders->skip(2)->first()->id ?? 3,
                'reference_number' => 'ORD-20260319-0003',
                'description' => 'Mengubah status pesanan: ORD-20260319-0003',
                'old_values' => ['status' => 'pending'],
                'new_values' => ['status' => 'cancelled'],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_PAYMENT,
                'action' => TransactionLog::ACTION_PAYMENT,
                'reference_id' => $orders->skip(3)->first()->id ?? 4,
                'reference_number' => 'ORD-20260318-0004',
                'description' => 'Update pembayaran pesanan: ORD-20260318-0004 - Status: failed',
                'old_values' => ['payment_status' => 'unpaid'],
                'new_values' => [
                    'payment_status' => 'failed',
                    'payment_method' => 'credit_card',
                ],
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_PRODUCT,
                'action' => TransactionLog::ACTION_DELETE,
                'reference_id' => 999,
                'reference_number' => 'Produk Lama',
                'description' => 'Menghapus produk: Produk Lama',
                'old_values' => [
                    'name' => 'Produk Lama',
                    'price' => 100000,
                    'stock' => 10,
                ],
                'new_values' => null,
                'performed_by' => 'Admin',
            ],
            [
                'type' => TransactionLog::TYPE_ORDER,
                'action' => TransactionLog::ACTION_STATUS_CHANGE,
                'reference_id' => $orders->skip(4)->first()->id ?? 5,
                'reference_number' => 'ORD-20260317-0005',
                'description' => 'Mengubah status pesanan: ORD-20260317-0005',
                'old_values' => ['status' => 'shipped'],
                'new_values' => ['status' => 'delivered'],
                'performed_by' => 'Admin',
            ],
        ];

        foreach ($logs as $index => $log) {
            $createdAt = now()->subDays(rand(0, 5))->subHours(rand(0, 23))->subMinutes(rand(0, 59));

            TransactionLog::create(array_merge($log, [
                'ip_address' => '192.168.1.'.rand(1, 255),
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]));
        }
    }
}
