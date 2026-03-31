<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'original_price',
        'stock',
        'sku',
        'image',
        'category',
        'status',
        'plant_type',
        'scientific_name',
        'light_requirement',
        'water_requirement',
        'care_instructions',
        'is_featured',
        'view_count',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'stock' => 'integer',
        'view_count' => 'integer',
        'is_featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function getFormattedPriceAttribute()
    {
        return 'Rp '.number_format($this->price, 0, ',', '.');
    }

    public function getDiscountPercentageAttribute()
    {
        if ($this->original_price && $this->original_price > $this->price) {
            return round((($this->original_price - $this->price) / $this->original_price) * 100);
        }

        return 0;
    }

    public function isInStock()
    {
        return $this->stock > 0;
    }

    public function categories()
    {
        return [
            'succulents' => 'Succulents',
            'tropical' => 'Tropical Plants',
            'herbs' => 'Herbs',
            'ferns' => 'Ferns',
            'flowering' => 'Flowering Plants',
            'air_plants' => 'Air Plants',
            'pots' => 'Pots & Planters',
            'tools' => 'Tools & Accessories',
        ];
    }
}
