import { Link } from "@inertiajs/react";

export default function Pagination({ pagination, className = "" }) {
    if (!pagination || pagination.last_page <= 1) {
        return null;
    }

    const { current_page, from, to, total, links, last_page } = pagination;

    const getPageRange = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= last_page; i++) {
            if (i === 1 || i === last_page || (i >= current_page - delta && i <= current_page + delta)) {
                range.push(i);
            }
        }

        let prev;
        for (const i of range) {
            if (prev) {
                if (i - prev === 2) {
                    rangeWithDots.push(prev + 1);
                } else if (i - prev !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            prev = i;
        }

        return rangeWithDots;
    };

    return (
        <div className={`pagination ${className}`}>
            <div className="pagination-info">
                Menampilkan <span className="font-medium">{from}</span> - <span className="font-medium">{to}</span> dari <span className="font-medium">{total}</span>
            </div>
            <div className="pagination-buttons">
                {getPageRange().map((page, index) => {
                    if (page === "...") {
                        return (
                            <span key={`dots-${index}`} className="pagination-btn dots">
                                ...
                            </span>
                        );
                    }

                    const link = links.find((l) => l.label == page);
                    const url = link?.url || "#";
                    const isActive = current_page === page;

                    return (
                        <Link
                            key={page}
                            href={url}
                            className={`pagination-btn ${isActive ? "active" : ""} ${!url ? "disabled" : ""}`}
                            onClick={(e) => !url && e.preventDefault()}
                        >
                            {page}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
