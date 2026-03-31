import { router } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { ArrowLeftIcon } from "../../../Components/Icons";
import { Link } from "@inertiajs/react";

const statusColors = {
    pending: { bg: "rgba(196, 163, 90, 0.1)", text: "#c4a35a", label: "Menunggu" },
    processing: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", label: "Diproses" },
    shipped: { bg: "rgba(139, 92, 246, 0.1)", text: "#8b5cf6", label: "Dikirim" },
    delivered: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59", label: "Selesai" },
    cancelled: { bg: "rgba(156, 163, 175, 0.1)", text: "#6b7280", label: "Dibatalkan" },
    refunded: { bg: "rgba(220, 38, 38, 0.1)", text: "#dc2626", label: "Dikembalikan" },
};

const paymentStatusColors = {
    unpaid: { bg: "rgba(196, 163, 90, 0.1)", text: "#c4a35a", label: "Belum Bayar" },
    paid: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59", label: "Lunas" },
    failed: { bg: "rgba(220, 38, 38, 0.1)", text: "#dc2626", label: "Gagal" },
    refunded: { bg: "rgba(156, 163, 175, 0.1)", text: "#6b7280", label: "Dikembalikan" },
};

export default function Show({ order }) {
    const formatCurrency = (amount) => {
        return 'Rp ' + Number(amount).toLocaleString("id-ID");
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const updateStatus = (status) => {
        router.post(`/admin/orders/${order.id}/status`, { status });
    };

    const updatePayment = (payment_status) => {
        router.post(`/admin/orders/${order.id}/payment`, { payment_status });
    };

    return (
        <AdminLayout>
            <div className="page-header">
                <div className="header-back">
                    <Link href="/admin/orders" className="back-link-btn">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Kembali
                    </Link>
                    <div>
                        <div className="db-eyebrow">Detail Pesanan</div>
                        <h1 className="db-headline">{order.order_number}</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/admin/orders/${order.id}/edit`} className="btn-primary">
                        Edit Pesanan
                    </Link>
                </div>
            </div>

            <div className="order-detail-grid">
                {/* Order Info */}
                <div className="detail-section">
                    <h3 className="detail-section-title">Informasi Pesanan</h3>
                    <div className="detail-info">
                        <div className="detail-row">
                            <span className="detail-label">No. Pesanan</span>
                            <span className="detail-value">{order.order_number}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Tanggal</span>
                            <span className="detail-value">{formatDate(order.created_at)}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status</span>
                            <span
                                className="status-badge"
                                style={{
                                    background: statusColors[order.status]?.bg,
                                    color: statusColors[order.status]?.text,
                                }}
                            >
                                {statusColors[order.status]?.label}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Pembayaran</span>
                            <span
                                className="payment-badge"
                                style={{
                                    background: paymentStatusColors[order.payment_status]?.bg,
                                    color: paymentStatusColors[order.payment_status]?.text,
                                }}
                            >
                                {paymentStatusColors[order.payment_status]?.label}
                            </span>
                        </div>
                        {order.payment_method && (
                            <div className="detail-row">
                                <span className="detail-label">Metode</span>
                                <span className="detail-value">{order.payment_method.replace('_', ' ')}</span>
                            </div>
                        )}
                        {order.payment_reference && (
                            <div className="detail-row">
                                <span className="detail-label">No. Referensi</span>
                                <span className="detail-value">{order.payment_reference}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Customer Info */}
                <div className="detail-section">
                    <h3 className="detail-section-title">Informasi Pelanggan</h3>
                    <div className="detail-info">
                        <div className="detail-row">
                            <span className="detail-label">Nama</span>
                            <span className="detail-value">{order.customer_name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Email</span>
                            <span className="detail-value">{order.customer_email}</span>
                        </div>
                        {order.customer_phone && (
                            <div className="detail-row">
                                <span className="detail-label">Telepon</span>
                                <span className="detail-value">{order.customer_phone}</span>
                            </div>
                        )}
                        {order.shipping_address && (
                            <div className="detail-row" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                <span className="detail-label">Alamat</span>
                                <span className="detail-value" style={{ marginTop: "0.25rem" }}>{order.shipping_address}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Items */}
                <div className="detail-section full-width">
                    <h3 className="detail-section-title">Item Pesanan</h3>
                    <div className="order-items-table">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Produk</th>
                                    <th>SKU</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_sku || '-'}</td>
                                        <td>{formatCurrency(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatCurrency(item.subtotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="order-totals">
                        <div className="total-row">
                            <span>Subtotal</span>
                            <span>{formatCurrency(order.subtotal)}</span>
                        </div>
                        <div className="total-row">
                            <span>Ongkos Kirim</span>
                            <span>{formatCurrency(order.shipping_cost)}</span>
                        </div>
                        <div className="total-row">
                            <span>Pajak</span>
                            <span>{formatCurrency(order.tax)}</span>
                        </div>
                        <div className="total-row grand-total">
                            <span>Total</span>
                            <span>{formatCurrency(order.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                {order.notes && (
                    <div className="detail-section full-width">
                        <h3 className="detail-section-title">Catatan</h3>
                        <p style={{ fontFamily: "'Jost', sans-serif", color: "#5a6e5a" }}>{order.notes}</p>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="detail-section full-width">
                    <h3 className="detail-section-title">Update Status</h3>
                    <div className="status-actions">
                        <select
                            value={order.status}
                            onChange={(e) => updateStatus(e.target.value)}
                            className="form-input form-select"
                            style={{ maxWidth: "200px" }}
                        >
                            <option value="pending">Menunggu</option>
                            <option value="processing">Diproses</option>
                            <option value="shipped">Dikirim</option>
                            <option value="delivered">Selesai</option>
                            <option value="cancelled">Dibatalkan</option>
                        </select>

                        <select
                            value={order.payment_status}
                            onChange={(e) => updatePayment(e.target.value)}
                            className="form-input form-select"
                            style={{ maxWidth: "200px" }}
                        >
                            <option value="unpaid">Belum Bayar</option>
                            <option value="paid">Lunas</option>
                            <option value="failed">Gagal</option>
                            <option value="refunded">Dikembalikan</option>
                        </select>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
