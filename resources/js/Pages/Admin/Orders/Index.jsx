import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { PlusIcon, EyeIcon, EditIcon, TrashIcon } from "../../../Components/Icons";
import DataTable from "../../../Components/Admin/DataTable";
import FilterBar from "../../../Components/Admin/FilterBar";
import DeleteModal from "../../../Components/Admin/DeleteModal";

const statusLabels = {
    pending: "Menunggu",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Selesai",
    cancelled: "Dibatalkan",
    refunded: "Dikembalikan",
};

const paymentStatusLabels = {
    unpaid: "Belum Bayar",
    paid: "Lunas",
    failed: "Gagal",
    refunded: "Dikembalikan",
};

const formatCurrency = (amount) => `Rp ${Number(amount).toLocaleString("id-ID")}`;
const formatDate = (date) => new Date(date).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
});

const columns = [
    { key: "order_number", label: "No. Pesanan", type: "custom", render: (value) => (
        <span className="order-number">{value}</span>
    )},
    { key: "customer_name", label: "Pelanggan", type: "custom", render: (value, item) => (
        <div className="customer-info">
            <span className="customer-name">{value}</span>
            <span className="customer-email">{item.customer_email}</span>
        </div>
    )},
    { key: "items", label: "Items", type: "custom", render: (value) => (
        <span className="items-count">{value?.length || 0} item(s)</span>
    )},
    { key: "total", label: "Total", type: "currency" },
    { key: "status", label: "Status", type: "status", labels: statusLabels },
    { key: "payment_status", label: "Pembayaran", type: "status", labels: paymentStatusLabels },
    { key: "created_at", label: "Tanggal", type: "datetime" },
];

const filterOptions = [
    { key: "status", label: "Semua Status", options: ["pending", "processing", "shipped", "delivered", "cancelled"] },
    { key: "payment_status", label: "Semua Pembayaran", options: ["unpaid", "paid", "failed"] },
];

export default function OrdersIndex() {
    const { orders, stats, filters } = usePage().props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
            router.delete(`/admin/orders/${itemToDelete.id}`);
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };

    const confirmDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const actions = [
        { key: "view", type: "link", label: "Lihat Detail", href: (item) => `/admin/orders/${item.id}`, icon: <EyeIcon className="w-4 h-4" />, className: "view" },
        { key: "edit", type: "link", label: "Edit", href: (item) => `/admin/orders/${item.id}/edit`, icon: <EditIcon className="w-4 h-4" />, className: "edit" },
        { key: "delete", type: "button", label: "Hapus", onClick: confirmDelete, icon: <TrashIcon className="w-4 h-4" />, className: "delete" },
    ];

    return (
        <AdminLayout>
            <div className="page-header">
                <div>
                    <div className="db-eyebrow">Manajemen</div>
                    <h1 className="db-headline">Pesanan</h1>
                </div>
                <Link href="/admin/orders/create" className="btn-primary">
                    <PlusIcon className="w-4 h-4" />
                    Pesanan Baru
                </Link>
            </div>

            <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
                <div className="stat-card">
                    <div className="stat-label">Total Pesanan</div>
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-sub">semua pesanan</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Menunggu</div>
                    <div className="stat-value" style={{ color: "#c4a35a" }}>{stats.pending}</div>
                    <div className="stat-sub">pesanan baru</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Diproses</div>
                    <div className="stat-value" style={{ color: "#3b82f6" }}>{stats.processing}</div>
                    <div className="stat-sub">sedang dikerjakan</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Penjualan</div>
                    <div className="stat-value" style={{ color: "#4a7c59" }}>{formatCurrency(stats.revenue)}</div>
                    <div className="stat-sub">pesanan selesai</div>
                </div>
            </div>

            <FilterBar
                baseUrl="/admin/orders"
                filters={filters}
                searchPlaceholder="Cari pesanan..."
                filterOptions={filterOptions}
            />

            <DataTable
                columns={columns}
                data={orders.data}
                pagination={orders}
                actions={actions}
                emptyState={{ title: "Belum ada pesanan", text: "Pesanan akan muncul di sini" }}
            />

            <DeleteModal
                show={showDeleteModal}
                title="Hapus Pesanan"
                itemName={itemToDelete?.order_number}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </AdminLayout>
    );
}
