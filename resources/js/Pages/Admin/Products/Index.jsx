import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { PlusIcon, EditIcon, TrashIcon, StarIcon, EyeIcon } from "../../../Components/Icons";
import DataTable from "../../../Components/Admin/DataTable";
import FilterBar from "../../../Components/Admin/FilterBar";
import DeleteModal from "../../../Components/Admin/DeleteModal";

const statusLabels = {
    active: "Aktif",
    draft: "Draft",
    archived: "Arsip",
};

const plantTypeLabels = {
    indoor: "Indoor",
    outdoor: "Outdoor",
    both: "Indoor & Outdoor",
};

const columns = [
    { key: "name", label: "Produk", type: "custom", render: (value, item) => (
        <div className="product-cell">
            <div className="product-image">
                {item.image ? (
                    <img src={item.image} alt={value} />
                ) : (
                    <div className="product-image-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 22V12M12 12C12 7 7 4 3 5c0 5 3 9 9 9zM12 12c0-5 5-8 9-7-1 5-4 8-9 9" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="product-info">
                <div className="product-name">
                    {item.is_featured && <StarIcon className="featured-star" />}
                    {value}
                </div>
                {item.sku && <div className="product-sku">SKU: {item.sku}</div>}
            </div>
        </div>
    )},
    { key: "category", label: "Kategori", type: "badge" },
    { key: "formatted_price", label: "Harga", type: "text" },
    { key: "stock", label: "Stok", type: "stock" },
    { key: "status", label: "Status", type: "status", labels: statusLabels },
    { key: "plant_type", label: "Tipe", type: "custom", render: (value) => (
        <span className="type-badge">{plantTypeLabels[value]}</span>
    )},
];

const actions = [
    { key: "edit", type: "link", label: "Edit", href: (item) => `/admin/products/${item.id}/edit`, icon: <EditIcon className="w-4 h-4" />, className: "edit" },
    { key: "featured", type: "method", label: "Featured", href: (item) => `/admin/products/${item.id}/toggle-featured`, icon: <StarIcon className="w-4 h-4" />, className: "featured" },
    { key: "delete", type: "button", label: "Hapus", onClick: null, icon: <TrashIcon className="w-4 h-4" />, className: "delete" },
];

const filterOptions = [
    { key: "status", label: "Semua Status", options: ["active", "draft", "archived"] },
    { key: "category", label: "Semua Kategori", options: ["succulents", "tropical", "herbs", "ferns", "flowering", "air_plants", "pots", "tools"] },
    { key: "plant_type", label: "Semua Tipe", options: ["indoor", "outdoor", "both"] },
];

export default function ProductsIndex() {
    const { products, stats, filters } = usePage().props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
            router.delete(`/admin/products/${itemToDelete.id}`);
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };

    const confirmDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const actionsWithDelete = actions.map(a => 
        a.key === "delete" ? { ...a, onClick: confirmDelete } : a
    );

    return (
        <AdminLayout>
            <div className="page-header">
                <div>
                    <div className="db-eyebrow">Manajemen</div>
                    <h1 className="db-headline">Produk</h1>
                </div>
                <Link href="/admin/products/create" className="btn-primary">
                    <PlusIcon className="w-4 h-4" />
                    Tambah Produk
                </Link>
            </div>

            <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
                <div className="stat-card">
                    <div className="stat-label">Total Produk</div>
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-sub">semua produk</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Produk Aktif</div>
                    <div className="stat-value" style={{ color: "#4a7c59" }}>{stats.active}</div>
                    <div className="stat-sub">tersedia</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Draft</div>
                    <div className="stat-value" style={{ color: "#c4a35a" }}>{stats.draft}</div>
                    <div className="stat-sub">belum dipublikasi</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Stok Habis</div>
                    <div className="stat-value" style={{ color: "#dc2626" }}>{stats.out_of_stock}</div>
                    <div className="stat-sub">perlu restock</div>
                </div>
            </div>

            <FilterBar
                baseUrl="/admin/products"
                filters={filters}
                searchPlaceholder="Cari produk..."
                filterOptions={filterOptions}
            />

            <DataTable
                columns={columns}
                data={products.data}
                pagination={products}
                actions={actionsWithDelete}
                emptyState={{ title: "Belum ada produk", text: "Tambahkan produk pertama Anda" }}
            />

            <DeleteModal
                show={showDeleteModal}
                title="Hapus Produk"
                itemName={itemToDelete?.name}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </AdminLayout>
    );
}
