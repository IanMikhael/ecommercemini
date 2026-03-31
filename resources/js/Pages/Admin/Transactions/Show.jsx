import { Link } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { ArrowLeftIcon } from "../../../Components/Icons";

const typeLabels = {
    product: "Produk",
    order: "Pesanan",
    payment: "Pembayaran",
};

const actionLabels = {
    create: "Dibuat",
    update: "Diperbarui",
    delete: "Dihapus",
    status_change: "Status Berubah",
    payment: "Pembayaran",
    toggle_featured: "Fitur Berubah",
};

export default function TransactionShow({ log }) {
    const formatDate = (date) => new Date(date).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <AdminLayout>
            <div className="page-header">
                <div className="header-back">
                    <Link href="/admin/transactions" className="back-link-btn">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Kembali
                    </Link>
                    <div>
                        <div className="db-eyebrow">Detail Transaksi</div>
                        <h1 className="db-headline">Log #{log.id}</h1>
                    </div>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-section">
                    <h3 className="form-section-title">Informasi Umum</h3>
                    
                    <div className="detail-row">
                        <span className="detail-label">Waktu</span>
                        <span className="detail-value">{formatDate(log.created_at)}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Tipe</span>
                        <span className="detail-value">
                            <span className="status-badge" style={{ 
                                background: log.type === 'product' ? 'rgba(74, 124, 89, 0.1)' : 
                                           log.type === 'order' ? 'rgba(59, 130, 246, 0.1)' : 
                                           'rgba(139, 92, 246, 0.1)', 
                                color: log.type === 'product' ? '#4a7c59' : 
                                      log.type === 'order' ? '#3b82f6' : '#8b5cf6' 
                            }}>
                                {typeLabels[log.type] || log.type}
                            </span>
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Aksi</span>
                        <span className="detail-value">
                            <span className="status-badge" style={{ 
                                background: log.action === 'create' ? 'rgba(74, 124, 89, 0.1)' : 
                                           log.action === 'delete' ? 'rgba(220, 38, 38, 0.1)' : 
                                           'rgba(59, 130, 246, 0.1)', 
                                color: log.action === 'create' ? '#4a7c59' : 
                                      log.action === 'delete' ? '#dc2626' : '#3b82f6' 
                            }}>
                                {actionLabels[log.action] || log.action}
                            </span>
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Referensi</span>
                        <span className="detail-value font-medium">{log.reference_number || '-'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Deskripsi</span>
                        <span className="detail-value">{log.description}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Oleh</span>
                        <span className="detail-value">{log.performed_by || 'System'}</span>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="form-section-title">Data Sebelum</h3>
                    {log.old_values ? (
                        <div className="code-block">
                            <pre>{JSON.stringify(log.old_values, null, 2)}</pre>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">Tidak ada data sebelumnya</p>
                    )}
                </div>

                <div className="form-section">
                    <h3 className="form-section-title">Data Sesudah</h3>
                    {log.new_values ? (
                        <div className="code-block">
                            <pre>{JSON.stringify(log.new_values, null, 2)}</pre>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">Tidak ada data baru</p>
                    )}
                </div>

                <div className="form-section">
                    <h3 className="form-section-title">Informasi Sistem</h3>
                    <div className="detail-row">
                        <span className="detail-label">IP Address</span>
                        <span className="detail-value font-mono text-sm">{log.ip_address || '-'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">User Agent</span>
                        <span className="detail-value text-sm">{log.user_agent || '-'}</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
