<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionLog extends Model
{
    protected $fillable = [
        'type',
        'action',
        'reference_id',
        'reference_number',
        'description',
        'old_values',
        'new_values',
        'performed_by',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'created_at' => 'datetime',
    ];

    public const TYPE_PRODUCT = 'product';

    public const TYPE_ORDER = 'order';

    public const TYPE_PAYMENT = 'payment';

    public const ACTION_CREATE = 'create';

    public const ACTION_UPDATE = 'update';

    public const ACTION_DELETE = 'delete';

    public const ACTION_STATUS_CHANGE = 'status_change';

    public const ACTION_PAYMENT = 'payment';

    public function scopeProduct($query)
    {
        return $query->where('type', self::TYPE_PRODUCT);
    }

    public function scopeOrder($query)
    {
        return $query->where('type', self::TYPE_ORDER);
    }

    public function scopePayment($query)
    {
        return $query->where('type', self::TYPE_PAYMENT);
    }

    public function scopeRecent($query, $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeOfAction($query, $action)
    {
        return $query->where('action', $action);
    }

    public static function logProduct($action, $product, $oldValues = null, $newValues = null, $performedBy = 'Admin')
    {
        return self::create([
            'type' => self::TYPE_PRODUCT,
            'action' => $action,
            'reference_id' => $product->id,
            'reference_number' => $product->name,
            'description' => self::generateProductDescription($action, $product->name),
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'performed_by' => $performedBy,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    public static function logOrder($action, $order, $oldValues = null, $newValues = null, $performedBy = 'Admin')
    {
        return self::create([
            'type' => self::TYPE_ORDER,
            'action' => $action,
            'reference_id' => $order->id,
            'reference_number' => $order->order_number,
            'description' => self::generateOrderDescription($action, $order->order_number),
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'performed_by' => $performedBy,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    public static function logPayment($action, $order, $oldValues = null, $newValues = null, $performedBy = 'Admin')
    {
        return self::create([
            'type' => self::TYPE_PAYMENT,
            'action' => $action,
            'reference_id' => $order->id,
            'reference_number' => $order->order_number,
            'description' => self::generatePaymentDescription($action, $order->order_number, $newValues),
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'performed_by' => $performedBy,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    protected static function generateProductDescription($action, $productName)
    {
        return match ($action) {
            self::ACTION_CREATE => "Menambah produk baru: {$productName}",
            self::ACTION_UPDATE => "Memperbarui produk: {$productName}",
            self::ACTION_DELETE => "Menghapus produk: {$productName}",
            'toggle_featured' => "Mengubah status fitur produk: {$productName}",
            default => "Aksi pada produk: {$productName}",
        };
    }

    protected static function generateOrderDescription($action, $orderNumber)
    {
        return match ($action) {
            self::ACTION_CREATE => "Membuat pesanan baru: {$orderNumber}",
            self::ACTION_UPDATE => "Memperbarui pesanan: {$orderNumber}",
            self::ACTION_DELETE => "Menghapus pesanan: {$orderNumber}",
            self::ACTION_STATUS_CHANGE => "Mengubah status pesanan: {$orderNumber}",
            default => "Aksi pada pesanan: {$orderNumber}",
        };
    }

    protected static function generatePaymentDescription($action, $orderNumber, $newValues)
    {
        $status = $newValues['payment_status'] ?? 'unknown';

        return match ($action) {
            self::ACTION_PAYMENT => "Update pembayaran pesanan: {$orderNumber} - Status: {$status}",
            default => "Aksi pembayaran pada pesanan: {$orderNumber}",
        };
    }

    public function getTypeLabelAttribute()
    {
        return match ($this->type) {
            self::TYPE_PRODUCT => 'Produk',
            self::TYPE_ORDER => 'Pesanan',
            self::TYPE_PAYMENT => 'Pembayaran',
            default => ucfirst($this->type),
        };
    }

    public function getActionLabelAttribute()
    {
        return match ($this->action) {
            self::ACTION_CREATE => 'Dibuat',
            self::ACTION_UPDATE => 'Diperbarui',
            self::ACTION_DELETE => 'Dihapus',
            self::ACTION_STATUS_CHANGE => 'Status Berubah',
            self::ACTION_PAYMENT => 'Pembayaran',
            'toggle_featured' => 'Fitur Berubah',
            default => ucfirst($this->action),
        };
    }

    public function getFormattedDateAttribute()
    {
        return $this->created_at->format('d M Y, H:i');
    }
}
