import { useState } from "react";
import { router } from "@inertiajs/react";
import { SearchIcon } from "../Icons";

export default function FilterBar({ 
    baseUrl, 
    filters: initialFilters = {}, 
    searchPlaceholder = "Cari...",
    filterOptions = [],
    showSearch = true,
    onFilterChange,
}) {
    const [search, setSearch] = useState(initialFilters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        const newFilters = { ...initialFilters, search };
        if (onFilterChange) {
            onFilterChange(newFilters);
        } else {
            router.get(baseUrl, newFilters, { preserveState: true });
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...initialFilters, [key]: value };
        if (onFilterChange) {
            onFilterChange(newFilters);
        } else {
            router.get(baseUrl, newFilters, { preserveState: true });
        }
    };

    return (
        <div className="filters-bar">
            {showSearch && (
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <SearchIcon className="search-icon" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </form>
            )}

            {filterOptions.length > 0 && (
                <div className="filter-group">
                    {filterOptions.map((filter) => (
                        <select
                            key={filter.key}
                            value={initialFilters[filter.key] || filter.default || "all"}
                            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                            className="filter-select"
                        >
                            <option value={filter.default || "all"}>{filter.label}</option>
                            {filter.options.map((opt) =>
                                typeof opt === "object" ? (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ) : (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                )
                            )}
                        </select>
                    ))}
                </div>
            )}
        </div>
    );
}
