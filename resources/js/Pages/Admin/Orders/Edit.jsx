import { useForm } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "../../../Components/Icons";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import FormField from "../../../Components/Admin/FormField";

export default function Edit({ order, products }) {
    const { data, setData, put, errors, processing } = useForm({
        customer_name: order.customer_name || "",
        customer_email: order.customer_email || "",
        customer_phone: order.customer_phone || "",
        shipping_address: order.shipping_address || "",
        status: order.status || "pending",
        payment_status: order.payment_status || "unpaid",
        payment_method: order.payment_method || "",
        payment_reference: order.payment_reference || "",
        notes: order.notes || "",
        shipping_cost: order.shipping_cost || 0,
        tax: order.tax || 0,
        items: order.items?.map(item => ({
            product_id: item.product_id,
            product_name: item.product_name,
            product_sku: item.product_sku,
            quantity: item.quantity,
            price: item.price,
        })) || [],
    });

    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);

    const addItem = () => {
        if (!selectedProduct) return;
        const product = products.find(p => p.id === parseInt(selectedProduct));
        if (!product) return;

        const newItem = {
            product_id: product.id,
            product_name: product.name,
            product_sku: `SKU-${product.id}`,
            quantity: quantity,
            price: product.price,
        };

        setData("items", [...data.items, newItem]);
        setSelectedProduct("");
        setQuantity(1);
    };

    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
    };

    const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const total = subtotal + data.shipping_cost + data.tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/orders/${order.id}`, {
            onSuccess: () => {},
        });
    };

    const statusOptions = [
        { value: "pending", label: "Menunggu" },
        { value: "processing", label: "Diproses" },
        { value: "shipped", label: "Dikirim" },
        { value: "delivered", label: "Selesai" },
        { value: "cancelled", label: "Dibatalkan" },
    ];
    const paymentStatusOptions = [
        { value: "unpaid", label: "Belum Bayar" },
        { value: "paid", label: "Lunas" },
        { value: "failed", label: "Gagal" },
        { value: "refunded", label: "Dikembalikan" },
    ];
    const paymentMethodOptions = [
        { value: "", label: "Pilih" },
        { value: "bank_transfer", label: "Transfer Bank" },
        { value: "ewallet", label: "E-Wallet" },
        { value: "cod", label: "COD" },
        { value: "credit_card", label: "Kartu Kredit" },
    ];
    const productOptions = [{ value: "", label: "Pilih Produk" }, ...products.map(p => ({
        value: p.id,
        label: `${p.name} - Rp ${Number(p.price).toLocaleString("id-ID")}`
    }))];

    return (
        <AdminLayout>
            <div className="page-header">
                <div className="header-back">
                    <Link href="/admin/orders" className="back-link-btn">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Kembali
                    </Link>
                    <div>
                        <div className="db-eyebrow">Edit Pesanan</div>
                        <h1 className="db-headline">{order.order_number}</h1>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-grid">
                    <div className="form-section">
                        <h3 className="form-section-title">Informasi Pelanggan</h3>
                        <FormField
                            label="Nama Pelanggan"
                            name="customer_name"
                            value={data.customer_name}
                            onChange={(val) => setData("customer_name", val)}
                            error={errors.customer_name}
                            placeholder="Nama lengkap"
                            required
                        />
                        <FormField
                            label="Email"
                            name="customer_email"
                            type="email"
                            value={data.customer_email}
                            onChange={(val) => setData("customer_email", val)}
                            error={errors.customer_email}
                            placeholder="email@example.com"
                            required
                        />
                        <FormField
                            label="No. Telepon"
                            name="customer_phone"
                            value={data.customer_phone}
                            onChange={(val) => setData("customer_phone", val)}
                            placeholder="08xxxxxxxxxx"
                        />
                        <FormField
                            label="Alamat Pengiriman"
                            name="shipping_address"
                            type="textarea"
                            value={data.shipping_address}
                            onChange={(val) => setData("shipping_address", val)}
                            rows={3}
                            placeholder="Alamat lengkap..."
                        />
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Item Pesanan</h3>
                        <div className="form-group">
                            <label className="form-label">Tambah Item</label>
                            <div className="flex gap-2 items-center">
                                <select
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                    className="form-input form-select flex-1"
                                >
                                    {productOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    min="1"
                                    className="form-input w-24"
                                />
                                <button type="button" onClick={addItem} className="btn-primary" style={{ padding: "0.75rem" }}>
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {data.items.length > 0 && (
                            <div className="order-items-list">
                                {data.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="order-item-info">
                                            <span className="order-item-name">{item.product_name}</span>
                                            <span className="order-item-price">
                                                {item.quantity} x Rp {Number(item.price).toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                        <button type="button" onClick={() => removeItem(index)} className="order-item-remove">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.items && <span className="form-error">{errors.items}</span>}
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Pembayaran & Status</h3>
                        <div className="form-row">
                            <FormField
                                label="Status Pesanan"
                                name="status"
                                type="select"
                                value={data.status}
                                onChange={(val) => setData("status", val)}
                                options={statusOptions}
                            />
                            <FormField
                                label="Status Pembayaran"
                                name="payment_status"
                                type="select"
                                value={data.payment_status}
                                onChange={(val) => setData("payment_status", val)}
                                options={paymentStatusOptions}
                            />
                        </div>
                        <div className="form-row">
                            <FormField
                                label="Metode Pembayaran"
                                name="payment_method"
                                type="select"
                                value={data.payment_method}
                                onChange={(val) => setData("payment_method", val)}
                                options={paymentMethodOptions}
                            />
                            <FormField
                                label="No. Referensi"
                                name="payment_reference"
                                value={data.payment_reference}
                                onChange={(val) => setData("payment_reference", val)}
                                placeholder="No. transfer/ref"
                            />
                        </div>
                        <FormField
                            label="Catatan"
                            name="notes"
                            type="textarea"
                            value={data.notes}
                            onChange={(val) => setData("notes", val)}
                            rows={3}
                            placeholder="Catatan pesanan..."
                        />
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Ringkasan</h3>
                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                            </div>
                            <FormField
                                label="Ongkos Kirim"
                                name="shipping_cost"
                                type="number"
                                value={data.shipping_cost}
                                onChange={(val) => setData("shipping_cost", val)}
                                min={0}
                            />
                            <FormField
                                label="Pajak"
                                name="tax"
                                type="number"
                                value={data.tax}
                                onChange={(val) => setData("tax", val)}
                                min={0}
                            />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>Rp {total.toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <Link href="/admin/orders" className="btn-secondary">
                        Batal
                    </Link>
                    <button type="submit" className="btn-primary" disabled={processing}>
                        {processing ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
