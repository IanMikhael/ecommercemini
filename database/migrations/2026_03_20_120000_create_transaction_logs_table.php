<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaction_logs', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // product, order, payment
            $table->string('action'); // create, update, delete, status_change, payment
            $table->unsignedBigInteger('reference_id');
            $table->string('reference_number')->nullable(); // order_number, product_name
            $table->string('description');
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->string('performed_by')->nullable(); // admin name or system
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();

            $table->index(['type', 'action']);
            $table->index('reference_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaction_logs');
    }
};
