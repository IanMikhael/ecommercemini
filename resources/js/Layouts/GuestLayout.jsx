import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function GuestLayout({ children }) {
    const [navScrolled, setNavScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setNavScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@400;500;600&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    /* Colorful Tropical Vibe */
                    --deep-botanic: #064e3b; 
                    --accent-green: #10b981; 
                    --pop-yellow:   #fcd34d; 
                    --pop-pink:     #fbcfe8; 
                    
                    /* Section Backgrounds */
                    --bg-white: #ffffff;
                    --bg-soft:  #f0fdf4; 
                    --bg-warm:  #fffbeb; 
                    
                    --text-main: #0f172a;
                    --text-muted: #475569;
                }

                html { scroll-behavior: smooth; }
                body { font-family: 'Jost', sans-serif; background: var(--bg-white); color: var(--text-main); overflow-x: hidden; }

                /* ── NAV ── */
                .lp-nav {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
                    background: var(--pop-yellow); 
                    transition: box-shadow .3s, background .3s; padding: 0 1.5rem;
                }
                .lp-nav.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,.1); background: rgba(252, 211, 77, 0.95); backdrop-filter: blur(10px); }
                .lp-nav-inner {
                    max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 70px;
                }
                .lp-logo { text-decoration: none; display: flex; align-items: center; gap: .5rem;}
                .lp-logo-name { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 1.5rem; color: var(--deep-botanic); }
                
                .lp-nav-links { display: flex; gap: 2rem; list-style: none; }
                .lp-nav-links a { font-weight: 600; text-transform: uppercase; letter-spacing: .05em; color: var(--deep-botanic); text-decoration: none; font-size: .85rem;}
                .lp-nav-links a:hover { color: #fff; }

                .lp-nav-icons { display: flex; gap: 1rem; color: var(--deep-botanic); align-items: center;}
                .nav-icon { cursor: pointer; }
                
                .lp-hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--deep-botanic); }
                @media (max-width: 900px) { .lp-nav-links { display: none; } .lp-hamburger { display: block; } }

                /* Mobile menu */
                .lp-mobile-menu {
                    position: fixed; inset: 0; z-index: 99; background: var(--pop-yellow);
                    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
                    transform: translateY(-100%); transition: transform .3s ease-in-out;
                }
                .lp-mobile-menu.open { transform: translateY(0); }
                .lp-mobile-menu a { font-size: 1.5rem; font-weight: 600; color: var(--deep-botanic); text-decoration: none; text-transform: uppercase; }

                /* ── GLOBAL COMPONENTS ── */
                .section { padding: 5rem 1.5rem; } 
                .section-inner { max-width: 1200px; margin: 0 auto; }
                
                .section-title {
                    font-family: 'Cormorant Garamond', serif; font-weight: 600;
                    font-size: clamp(2rem, 5vw, 2.8rem); color: var(--deep-botanic);
                    text-align: center; margin-bottom: 2.5rem; 
                }

                /* Fun Button */
                .btn-tlb {
                    display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
                    font-family: 'Jost', sans-serif; font-size: .85rem; font-weight: 600;
                    text-transform: uppercase; letter-spacing: .1em;
                    color: #fff; background: var(--accent-green);
                    border-radius: 50px; 
                    padding: .8rem 2.2rem; cursor: pointer; text-decoration: none;
                    transition: all 0.2s ease; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                }
                .btn-tlb:hover { background: var(--deep-botanic); transform: translateY(-2px); }

                /* ── FOOTER ── */
                .footer { background: var(--deep-botanic); padding: 4rem 1.5rem; color: #fff; }
                .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 2rem; }
                .footer-col-title { font-size: .9rem; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 1rem; color: var(--pop-yellow); }
                .footer-links { list-style: none; display: flex; flex-direction: column; gap: .5rem; }
                .footer-links a { font-size: .9rem; color: #e2e8f0; text-decoration: none; transition: color .2s;}
                .footer-links a:hover { color: var(--pop-yellow); }
                @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 2.5rem; text-align: center; } }
            `}</style>

            <nav className={`lp-nav ${navScrolled ? "scrolled" : ""}`}>
                <div className="lp-nav-inner">
                    <button className="lp-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                    <Link href="/" className="lp-logo">
                        <span className="lp-logo-mark" style={{fontSize: '1.2rem'}}>🌱</span>
                        <span className="lp-logo-name">Home Botanical</span>
                    </Link>
                    <ul className="lp-nav-links">
                        <li><a href="#categories">Categories</a></li>
                        <li><a href="#best-sellers">Best Sellers</a></li>
                        <li><Link href="/katalog">Shop All</Link></li>
                        <li><a href="#about">Our Story</a></li>
                    </ul>
                    <div className="lp-nav-icons">
                        <Link href="/admin/login" style={{ fontSize: '.75rem', fontWeight: 'bold', textDecoration: 'none', color: 'var(--deep-botanic)', border: '1px solid var(--deep-botanic)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>STAFF LOGIN</Link>
                    </div>
                </div>
            </nav>

            <div className={`lp-mobile-menu ${menuOpen ? "open" : ""}`}>
                <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
                <a href="#best-sellers" onClick={() => setMenuOpen(false)}>Best Sellers</a>
                <Link href="/katalog" onClick={() => setMenuOpen(false)}>Shop All</Link>
                <Link href="/admin/login" onClick={() => setMenuOpen(false)}>Staff Login</Link>
            </div>

            <main style={{ paddingTop: '70px' }}>{children}</main>

            <footer className="footer">
                <div className="footer-inner">
                    <div>
                        <h2 className="lp-logo-name" style={{ color: "var(--pop-yellow)", marginBottom: "1rem" }}>Home Botanical</h2>
                        <p style={{ fontSize: ".9rem", color: "#cbd5e1", maxWidth: "250px", lineHeight: "1.6" }}>
                            Bringing the vibrant colors of nature straight into your beautiful home.
                        </p>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Shop</h4>
                        <ul className="footer-links">
                            <li><a href="#">Indoor Plants</a></li>
                            <li><a href="#">Designer Pots</a></li>
                            <li><a href="#">Gift Cards</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Support</h4>
                        <ul className="footer-links">
                            <li><a href="#">Plant Care Guide</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Say G'day</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "3rem", paddingTop: "1.5rem", textAlign: "center", fontSize: ".8rem", color: "#94a3b8" }}>
                    © 2026 Home Botanical AU. Designed by RunDev.
                </div>
            </footer>
        </>
    );
}