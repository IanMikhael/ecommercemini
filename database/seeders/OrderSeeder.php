<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();

        if ($products->isEmpty()) {
            $this->command->info('No products found. Please run ProductSeeder first.');

            return;
        }

        $orders = [
            [
                'customer_name' => 'Sarah Wijaya',
                'customer_email' => 'sarah.wijaya@email.com',
                'customer_phone' => '081234567890',
                'shipping_address' => 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190',
                'subtotal' => 330000,
                'shipping_cost' => 25000,
                'tax' => 33000,
                'total' => 388000,
                'status' => 'delivered',
                'payment_status' => 'paid',
                'payment_method' => 'bank_transfer',
                'payment_reference' => 'TRF-2026-001',
                'notes' => 'Pelanggan VIP, berikan packaging tambahan',
                'paid_at' => Carbon::now()->subDays(7),
                'shipped_at' => Carbon::now()->subDays(5),
                'delivered_at' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now()->subDays(7),
                'items' => [
                    ['product_name' => 'Monstera Deliciosa', 'product_sku' => 'MONS-001', 'quantity' => 1, 'price' => 285000],
                    ['product_name' => 'Echeveria Elegans', 'product_sku' => 'SUCC-001', 'quantity' => 1, 'price' => 45000],
                ],
            ],
            [
                'customer_name' => 'Budi Santoso',
                'customer_email' => 'budi.santoso@gmail.com',
                'customer_phone' => '087654321098',
                'shipping_address' => 'Jl. Braga No. 45, Bandung, Jawa Barat 40111',
                'subtotal' => 195000,
                'shipping_cost' => 20000,
                'tax' => 19500,
                'total' => 234500,
                'status' => 'shipped',
                'payment_status' => 'paid',
                'payment_method' => 'ewallet',
                'payment_reference' => 'OVO-20260315001',
                'notes' => null,
                'paid_at' => Carbon::now()->subDays(3),
                'shipped_at' => Carbon::now()->subDays(1),
                'delivered_at' => null,
                'created_at' => Carbon::now()->subDays(3),
                'items' => [
                    ['product_name' => 'Peace Lily', 'product_sku' => 'TROP-001', 'quantity' => 1, 'price' => 150000],
                    ['product_name' => 'Boston Fern', 'product_sku' => 'FERN-001', 'quantity' => 1, 'price' => 45000],
                ],
            ],
            [
                'customer_name' => 'Anita Dewi',
                'customer_email' => 'anita.dewi@outlook.com',
                'customer_phone' => '082112345678',
                'shipping_address' => 'Jl. Pahlawan No. 78, Surabaya, Jawa Timur 60111',
                'subtotal' => 130000,
                'shipping_cost' => 30000,
                'tax' => 13000,
                'total' => 173000,
                'status' => 'processing',
                'payment_status' => 'paid',
                'payment_method' => 'bank_transfer',
                'payment_reference' => 'TRF-2026-003',
                'notes' => 'Minta dikirim pagi hari',
                'paid_at' => Carbon::now()->subDays(1),
                'shipped_at' => null,
                'delivered_at' => null,
                'created_at' => Carbon::now()->subDays(2),
                'items' => [
                    ['product_name' => 'Jade Plant', 'product_sku' => 'SUCC-002', 'quantity' => 1, 'price' => 85000],
                    ['product_name' => 'Echeveria Elegans', 'product_sku' => 'SUCC-001', 'quantity' => 1, 'price' => 45000],
                ],
            ],
            [
                'customer_name' => 'Rudi Hermawan',
                'customer_email' => 'rudi.h@company.co.id',
                'customer_phone' => '081987654321',
                'shipping_address' => 'Jl. Malioboro No. 10, Yogyakarta 55222',
                'subtotal' => 285000,
                'shipping_cost' => 25000,
                'tax' => 28500,
                'total' => 338500,
                'status' => 'pending',
                'payment_status' => 'unpaid',
                'payment_method' => null,
                'payment_reference' => null,
                'notes' => 'Menunggu transfer dari finance',
                'paid_at' => null,
                'shipped_at' => null,
                'delivered_at' => null,
                'created_at' => Carbon::now()->subHours(12),
                'items' => [
                    ['product_name' => 'Monstera Deliciosa', 'product_sku' => 'MONS-001', 'quantity' => 1, 'price' => 285000],
                ],
            ],
            [
                'customer_name' => 'Maya Putri',
                'customer_email' => 'maya.putri@gmail.com',
                'customer_phone' => '085612345678',
                'shipping_address' => 'Jl. Dago No. 55, Bandung, Jawa Barat 40135',
                'subtotal' => 150000,
                'shipping_cost' => 15000,
                'tax' => 15000,
                'total' => 180000,
                'status' => 'cancelled',
                'payment_status' => 'failed',
                'payment_method' => 'credit_card',
                'payment_reference' => null,
                'notes' => 'Pelanggan membatalkan pesanan',
                'paid_at' => null,
                'shipped_at' => null,
                'delivered_at' => null,
                'created_at' => Carbon::now()->subDays(5),
                'items' => [
                    ['product_name' => 'Peace Lily', 'product_sku' => 'TROP-001', 'quantity' => 1, 'price' => 150000],
                ],
            ],
        ];

        foreach ($orders as $orderData) {
            $items = $orderData['items'];
            unset($orderData['items']);

            $orderData['order_number'] = Order::generateOrderNumber();

            $order = Order::create($orderData);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => null,
                    'product_name' => $item['product_name'],
                    'product_sku' => $item['product_sku'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['quantity'] * $item['price'],
                ]);
            }
        }
    }
}
