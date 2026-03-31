import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import LeafAccent from "../Components/Admin/LeafAccent";
import { navItems, quickActions } from "../Components/Admin/Navigation";
import {
    BellIcon,
    MenuIcon,
    LogoutIcon,
    PlusIcon,
    ChartIcon,
    GridIcon,
} from "../Components/Icons";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const csrfToken = document.querySelector(
        'meta[name="csrf-token"]',
    )?.content;

    return (
        <div className="admin-layout">
            <div className="admin-layout-sidebar">
                <LeafAccent className="sidebar-leaf-1" />
                <LeafAccent className="sidebar-leaf-2" />

                <div className="sidebar-inner">
                    <div className="sidebar-logo">
                        <Link href="/admin" className="sidebar-logo-link">
                            <div className="sidebar-logo-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    className="w-4 h-4"
                                >
                                    <path d="M12 22V12M12 12C12 7 7 4 3 5c0 5 3 9 9 9zM12 12c0-5 5-8 9-7-1 5-4 8-9 9" />
                                </svg>
                            </div>
                            <div>
                                <div className="logo-text">Home Botanical</div>
                                <div className="logo-sub">Admin Console</div>
                            </div>
                        </Link>
                    </div>

                    <nav className="sidebar-nav">
                        <div className="nav-section-label">Navigation</div>
                        <div className="nav-links">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="nav-link"
                                >
                                    <span className="nav-icon">
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        <div className="divider" />

                        <div className="nav-section-label">Quick Access</div>
                        <div className="nav-links">
                            <a href="/admin/plants/create" className="nav-link">
                                <span className="nav-icon">
                                    <PlusIcon className="w-5 h-5" />
                                </span>
                                <span>Add New Plant</span>
                            </a>
                            <a href="/admin/analytics" className="nav-link">
                                <span className="nav-icon">
                                    <ChartIcon className="w-5 h-5" />
                                </span>
                                <span>Analytics</span>
                            </a>
                        </div>
                    </nav>

                    <div className="sidebar-footer">
                        <form action="/admin/logout" method="POST">
                            <input
                                type="hidden"
                                name="_token"
                                value={csrfToken}
                            />
                            <button type="submit" className="logout-btn">
                                <LogoutIcon className="w-4.5 h-4.5" />
                                <span>Sign Out</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="admin-layout-main">
                <header
                    className={`admin-header ${scrolled ? "admin-header-scrolled" : ""}`}
                >
                    <div className="admin-header-left">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="burger-btn"
                            aria-label="Toggle menu"
                        >
                            <MenuIcon className="w-4 h-4" />
                        </button>
                        <div>
                            <div className="header-breadcrumb">
                                Home Botanical
                            </div>
                            <div className="header-title">Admin Panel</div>
                        </div>
                    </div>

                    <div className="admin-header-right">
                        <button className="notification-btn">
                            <BellIcon className="w-4 h-4" />
                            <span className="notification-dot" />
                        </button>
                        <div className="admin-status">
                            <span className="status-dot" />
                            <span className="status-badge">Admin</span>
                        </div>
                    </div>
                </header>

                <main
                    className="admin-content"
                    onScroll={(e) => setScrolled(e.target.scrollTop > 10)}
                >
                    {children}
                </main>
            </div>

            {sidebarOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
