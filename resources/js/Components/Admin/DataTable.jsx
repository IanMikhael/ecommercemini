import { Link } from "@inertiajs/react";
import Pagination from "./Pagination";

const statusColors = {
    active: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59" },
    draft: { bg: "rgba(196, 163, 90, 0.1)", text: "#c4a35a" },
    archived: { bg: "rgba(156, 163, 175, 0.1)", text: "#6b7280" },
    pending: { bg: "rgba(196, 163, 90, 0.1)", text: "#c4a35a" },
    processing: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6" },
    shipped: { bg: "rgba(139, 92, 246, 0.1)", text: "#8b5cf6" },
    delivered: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59" },
    cancelled: { bg: "rgba(156, 163, 175, 0.1)", text: "#6b7280" },
    refunded: { bg: "rgba(220, 38, 38, 0.1)", text: "#dc2626" },
    paid: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59" },
    unpaid: { bg: "rgba(196, 163, 90, 0.1)", text: "#c4a35a" },
    failed: { bg: "rgba(220, 38, 38, 0.1)", text: "#dc2626" },
};

const stockColors = {
    out_of_stock: { bg: "rgba(220, 38, 38, 0.1)", text: "#dc2626" },
    low_stock: { bg: "rgba(196, 163, 90, 0.1)", text: "#c4a35a" },
    in_stock: { bg: "rgba(74, 124, 89, 0.1)", text: "#4a7c59" },
};

function getStockStatus(stock) {
    if (stock <= 0) return { class: "out_of_stock", label: "Habis" };
    if (stock <= 5) return { class: "low_stock", label: `${stock} units` };
    return { class: "in_stock", label: `${stock} units` };
}

function renderCell(column, item) {
    if (column.render) return column.render(item[column.key], item);
    
    if (column.type === "status") {
        const colors = statusColors[item[column.key]] || { bg: "rgba(156, 163, 175, 0.1)", text: "#6b7280" };
        const label = column.labels?.[item[column.key]] || item[column.key];
        return (
            <span
                className="status-badge"
                style={{ background: colors.bg, color: colors.text }}
            >
                {label}
            </span>
        );
    }
    
    if (column.type === "stock") {
        const status = getStockStatus(item[column.key]);
        const colors = stockColors[status.class];
        return (
            <span
                className="stock-badge"
                style={{ background: colors.bg, color: colors.text }}
            >
                {status.label}
            </span>
        );
    }
    
    if (column.type === "currency") {
        return (
            <span className="price-cell">
                Rp {Number(item[column.key]).toLocaleString("id-ID")}
            </span>
        );
    }
    
    if (column.type === "date") {
        return new Date(item[column.key]).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }
    
    if (column.type === "datetime") {
        return new Date(item[column.key]).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    
    if (column.type === "image") {
        return (
            <div className="product-image">
                {item[column.key] ? (
                    <img src={item[column.key]} alt="" />
                ) : (
                    <div className="product-image-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 22V12M12 12C12 7 7 4 3 5c0 5 3 9 9 9zM12 12c0-5 5-8 9-7-1 5-4 8-9 9" />
                        </svg>
                    </div>
                )}
            </div>
        );
    }
    
    if (column.type === "badge") {
        return (
            <span className="category-badge">
                {item[column.key]?.replace('_', ' ') || '-'}
            </span>
        );
    }
    
    return item[column.key];
}

export default function DataTable({
    columns,
    data,
    pagination,
    emptyState = { title: "Tidak ada data", text: "Data akan muncul di sini" },
    actions = [],
    showPagination = true,
    baseUrl = "",
    filters = {},
}) {
    const hasData = data && data.length > 0;
    
    return (
        <div className="table-container">
            {!hasData ? (
                <div className="empty-state">
                    <div className="empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32 }}>
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div className="empty-title">{emptyState.title}</div>
                    <div className="empty-text">{emptyState.text}</div>
                </div>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} style={{ width: col.width }}>
                                    {col.label}
                                </th>
                            ))}
                            {actions.length > 0 && <th style={{ width: actions.length > 2 ? "140px" : "100px" }}>Aksi</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {renderCell(col, item)}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td>
                                        <div className="action-buttons">
                                            {actions.map((action) => (
                                                action.render ? (
                                                    action.render(item)
                                                ) : action.type === "link" ? (
                                                    <Link
                                                        key={action.label}
                                                        href={action.href(item)}
                                                        className={`action-btn ${action.className || ''}`}
                                                        title={action.label}
                                                    >
                                                        {action.icon}
                                                    </Link>
                                                ) : action.type === "button" ? (
                                                    <button
                                                        key={action.label}
                                                        onClick={() => action.onClick(item)}
                                                        className={`action-btn ${action.className || ''}`}
                                                        title={action.label}
                                                    >
                                                        {action.icon}
                                                    </button>
                                                ) : (
                                                    <Link
                                                        key={action.label}
                                                        href={action.href(item)}
                                                        method={action.method}
                                                        as="button"
                                                        className={`action-btn ${action.className || ''}`}
                                                        title={action.label}
                                                    >
                                                        {action.icon}
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {showPagination && pagination && pagination.last_page > 1 && hasData && (
                <Pagination pagination={pagination} />
            )}
        </div>
    );
}
