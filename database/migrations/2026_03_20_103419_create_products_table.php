<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2);
            $table->decimal('original_price', 12, 2)->nullable();
            $table->integer('stock')->default(0);
            $table->string('sku')->unique()->nullable();
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->enum('status', ['active', 'draft', 'archived'])->default('draft');
            $table->enum('plant_type', ['indoor', 'outdoor', 'both'])->default('indoor');
            $table->string('scientific_name')->nullable();
            $table->string('light_requirement')->nullable();
            $table->string('water_requirement')->nullable();
            $table->text('care_instructions')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('view_count')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
