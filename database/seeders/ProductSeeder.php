<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Monstera Deliciosa',
                'slug' => 'monstera-deliciosa',
                'description' => 'Tanaman indoor populer dengan daun besar berlubang yang memberikan kesan tropis dan elegan. Cocok untuk dekorasi rumah modern.',
                'price' => 285000,
                'original_price' => 350000,
                'stock' => 15,
                'sku' => 'MONS-001',
                'image' => 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop',
                'category' => 'tropical',
                'status' => 'active',
                'plant_type' => 'indoor',
                'scientific_name' => 'Monstera deliciosa',
                'light_requirement' => 'medium',
                'water_requirement' => 'medium',
                'care_instructions' => 'Siram 1-2 kali seminggu. Hindari sinar matahari langsung. Bersihkan debu pada daun secara berkala.',
                'is_featured' => true,
            ],
            [
                'name' => 'Echeveria Elegans',
                'slug' => 'echeveria-elegans',
                'description' => 'Succulent kecil dengan daun berwarna hijau kebiruan yang tersusun rapi membentuk roset. Perawatan sangat mudah.',
                'price' => 45000,
                'original_price' => null,
                'stock' => 30,
                'sku' => 'SUCC-001',
                'image' => 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
                'category' => 'succulents',
                'status' => 'active',
                'plant_type' => 'indoor',
                'scientific_name' => 'Echeveria elegans',
                'light_requirement' => 'high',
                'water_requirement' => 'low',
                'care_instructions' => 'Siram setiap 10-14 hari. Pastikan tanah benar-benar kering antar penyiraman. Simpan di tempat dengan cahaya terang.',
                'is_featured' => true,
            ],
            [
                'name' => 'Jade Plant',
                'slug' => 'jade-plant',
                'description' => 'Tanaman sukulen yang dianggap sebagai simbol keberuntungan. Daunnya tebal dan berkilau seperti batu jade.',
                'price' => 85000,
                'original_price' => 120000,
                'stock' => 20,
                'sku' => 'SUCC-002',
                'image' => 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop',
                'category' => 'succulents',
                'status' => 'active',
                'plant_type' => 'both',
                'scientific_name' => 'Crassula ovata',
                'light_requirement' => 'high',
                'water_requirement' => 'low',
                'care_instructions' => 'Siram secukupnya, biarkan tanah mengering. Needs 4-6 hours of sunlight daily.',
                'is_featured' => false,
            ],
            [
                'name' => 'Peace Lily',
                'slug' => 'peace-lily',
                'description' => 'Tanaman dengan bunga putih elegan yang melambangkan kedamaian. Excellent for air purification.',
                'price' => 150000,
                'original_price' => null,
                'stock' => 8,
                'sku' => 'TROP-001',
                'image' => 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop',
                'category' => 'tropical',
                'status' => 'active',
                'plant_type' => 'indoor',
                'scientific_name' => 'Spathiphyllum wallisii',
                'light_requirement' => 'low',
                'water_requirement' => 'medium',
                'care_instructions' => 'Jaga tanah tetap lembab tapi tidak becek. Semprot daun secara berkala. Ideal untuk ruangan dengan sedikit cahaya.',
                'is_featured' => true,
            ],
            [
                'name' => 'Boston Fern',
                'slug' => 'boston-fern',
                'description' => 'Pakis dengan daun menjuntai yang indah. Menambah kelembaban alami dan membersihkan udara di ruangan.',
                'price' => 125000,
                'original_price' => 175000,
                'stock' => 12,
                'sku' => 'FERN-001',
                'image' => 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=400&fit=crop',
                'category' => 'ferns',
                'status' => 'active',
                'plant_type' => 'indoor',
                'scientific_name' => 'Nephrolepis exaltata',
                'light_requirement' => 'medium',
                'water_requirement' => 'high',
                'care_instructions' => 'Siram secara teratur agar tanah tetap lembab. Semprot daun setiap hari. Hindari AC langsung.',
                'is_featured' => false,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
