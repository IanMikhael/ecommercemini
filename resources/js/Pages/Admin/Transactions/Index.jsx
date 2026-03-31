import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { EyeIcon } from "../../../Components/Icons";
import DataTable from "../../../Components/Admin/DataTable";
import FilterBar from "../../../Components/Admin/FilterBar";

const typeColors = {
    product: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59", label: "Produk" },
    order: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", label: "Pesanan" },
    payment: { bg: "rgba(139, 92, 246, 0.1)", text: "#8b5cf6", label: "Pembayaran" },
};

const actionColors = {
    create: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59", label: "Dibuat" },
    update: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", label: "Diperbarui" },
    delete: { bg: "rgba(220, 38, 38, 0.1)", text: "#dc2626", label: "Dihapus" },
    status_change: { bg: "rgba(196, 163, 90, 0.1)", text: "#c4a35a", label: "Status Berubah" },
    payment: { bg: "rgba(139, 92, 246, 0.1)", text: "#8b5cf6", label: "Pembayaran" },
    toggle_featured: { bg: "rgba(236, 72, 153, 0.1)", text: "#ec4899", label: "Fitur Berubah" },
};

const formatDate = (date) => new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
});

const columns = [
    { key: "created_at", label: "Waktu", type: "custom", render: (value) => (
        <span className="text-sm">{formatDate(value)}</span>
    )},
    { key: "type", label: "Tipe", type: "custom", render: (value) => {
        const colors = typeColors[value] || { bg: "rgba(156, 163, 175, 0.1)", text: "#6b7280", label: value };
        return (
            <span className="status-badge" style={{ background: colors.bg, color: colors.text }}>
                {colors.label}
            </span>
        );
    }},
    { key: "action", label: "Aksi", type: "custom", render: (value) => {
        const colors = actionColors[value] || { bg: "rgba(156, 163, 175, 0.1)", text: "#6b7280", label: value };
        return (
            <span className="status-badge" style={{ background: colors.bg, color: colors.text }}>
                {colors.label}
            </span>
        );
    }},
    { key: "reference_number", label: "Referensi", type: "custom", render: (value, item) => (
        <div>
            <span className="font-medium">{value || '-'}</span>
        </div>
    )},
    { key: "description", label: "Deskripsi" },
    { key: "performed_by", label: "Oleh", type: "custom", render: (value) => (
        <span className="text-sm">{value || 'System'}</span>
    )},
];

const filterOptions = [
    { key: "type", label: "Semua Tipe", options: ["product", "order", "payment"] },
    { key: "action", label: "Semua Aksi", options: ["create", "update", "delete", "status_change", "payment"] },
];

export default function TransactionsIndex() {
    const { logs, stats, filters } = usePage().props;

    const actions = [
        { key: "view", type: "link", label: "Lihat Detail", href: (item) => `/admin/transactions/${item.id}`, icon: <EyeIcon className="w-4 h-4" />, className: "view" },
    ];

    return (
        <AdminLayout>
            <div className="page-header">
                <div>
                    <div className="db-eyebrow">Log Aktivitas</div>
                    <h1 className="db-headline">Transaksi</h1>
                </div>
            </div>

            <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
                <div className="stat-card">
                    <div className="stat-label">Total Transaksi</div>
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-sub">semua aktivitas</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Hari Ini</div>
                    <div className="stat-value" style={{ color: "#4a7c59" }}>{stats.today}</div>
                    <div className="stat-sub">transaksi</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Minggu Ini</div>
                    <div className="stat-value" style={{ color: "#3b82f6" }}>{stats.this_week}</div>
                    <div className="stat-sub">transaksi</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Produk</div>
                    <div className="stat-value" style={{ color: "#4a7c59" }}>{stats.by_type?.product || 0}</div>
                    <div className="stat-sub">aksi</div>
                </div>
            </div>

            <FilterBar
                baseUrl="/admin/transactions"
                filters={filters}
                searchPlaceholder="Cari transaksi..."
                filterOptions={filterOptions}
            />

            <DataTable
                columns={columns}
                data={logs.data}
                pagination={logs}
                actions={actions}
                emptyState={{ title: "Belum ada transaksi", text: "Aktivitas akan tercatat di sini" }}
            />
        </AdminLayout>
    );
}
