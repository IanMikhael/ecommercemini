import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { categories, featuredProducts, values } from "@/Constants/WelcomeData";

export default function Welcome() {
    return (
        <GuestLayout>
            <style>{`
                /* ── HERO (Ceria & Padat) ── */
                .hero-tlb {
                    background: linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-warm) 100%);
                    padding: 5rem 1.5rem; 
                }
                .hero-tlb-inner {
                    max-width: 1200px; margin: 0 auto;
                    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: center;
                }
                .hero-tlb-title {
                    font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: clamp(2.8rem, 5vw, 4.5rem);
                    color: var(--deep-botanic); line-height: 1.05; margin-bottom: 1.2rem;
                }
                .hero-tlb-sub { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 2rem; max-width: 450px;}
                
                /* Frame Gambar Bulat Unik */
                .hero-img-frame {
                    width: 100%; aspect-ratio: 4/3; background: var(--pop-yellow);
                    border-radius: 50% 20px 30% 10px; overflow: hidden;
                    box-shadow: 12px 12px 0px var(--accent-green); 
                    transition: transform 0.3s ease;
                }
                .hero-img-frame:hover { transform: translateY(-5px); }
                .hero-img-frame img { width: 100%; height: 100%; object-fit: cover; }

                @media (max-width: 900px) {
                    .hero-tlb-inner { grid-template-columns: 1fr; text-align: center; }
                    .hero-tlb-sub { margin-left: auto; margin-right: auto; }
                    .hero-img-frame { margin-top: 1rem; border-radius: 30px; }
                }

                /* ── INOVASI: MINI BANNER MATCHMAKER ── */
                .matchmaker-strip {
                    background: var(--deep-botanic); padding: 2rem 1.5rem; color: white; text-align: center;
                }
                .matchmaker-inner {
                    max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap;
                }
                .matchmaker-text { font-size: 1.1rem; font-weight: 500; font-family: 'Cormorant Garamond', serif; }

                /* ── PRODUCT GRID ── */
                .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2rem; }
                .product-card { text-decoration: none; border-radius: 20px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04); transition: transform .3s ease, box-shadow .3s; }
                .product-card:hover { transform: translateY(-8px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
                .product-card-image { width: 100%; aspect-ratio: 4/5; display: flex; align-items: center; justify-content: center; overflow: hidden;}
                .product-card-image img { width: 100%; height: 100%; object-fit: cover; }
                .product-info { padding: 1.5rem; text-align: center; }
                .product-card-name { font-size: 1.15rem; font-weight: 600; color: var(--deep-botanic); margin-bottom: .3rem; }
                .product-card-pot { font-size: .85rem; color: var(--text-muted); margin-bottom: .8rem; }
                .product-card-price { font-size: 1.05rem; font-weight: 600; color: var(--accent-green); }

                /* ── CATEGORY GRID ── */
                .cat-photo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
                .cat-photo-card { position: relative; aspect-ratio: 4/5; border-radius: 24px; overflow: hidden; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);}
                .cat-photo-card img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: transform .4s ease, opacity .4s;}
                .cat-photo-card:hover img { transform: scale(1.05); opacity: 1;}
                .cat-photo-name { position: absolute; bottom: 1.5rem; background: rgba(255,255,255,0.95); padding: .6rem 1.2rem; border-radius: 50px; font-weight: 600; color: var(--deep-botanic); font-size: .85rem; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 10px rgba(0,0,0,0.1);}
                @media (max-width: 768px) { .cat-photo-grid { grid-template-columns: repeat(2, 1fr); } }

                /* ── VALUES SECTION ── */
                .values-strip { background: var(--pop-yellow); padding: 4rem 1.5rem; }
                .values-strip-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; text-align: center; }
                .value-tlb-title { font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; font-weight: 600; color: var(--deep-botanic); margin-bottom: .5rem; }
                .value-tlb-desc { font-size: .95rem; color: var(--deep-botanic); max-width: 300px; margin: 0 auto; opacity: 0.85; line-height: 1.5;}
                @media (max-width: 768px) { .values-strip-inner { grid-template-columns: 1fr; gap: 2rem;} }
            `}</style>

            <Head title="Premium Indoor Plants - Home Botanical" />

            {/* HERO SECTION */}
            <section className="hero-tlb">
                <div className="hero-tlb-inner">
                    <div>
                        <h1 className="hero-tlb-title">Bring the Outdoors<br />Inside</h1>
                        <p className="hero-tlb-sub">
                            Elevate your space with our curated selection of happy, healthy indoor plants. Perfectly paired with stylish pots and delivered to your door. 🌿
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="#best-sellers" className="btn-tlb">Shop Now</a>
                        </div>
                    </div>
                    <div className="hero-img-frame">
                        <img src="https://images.unsplash.com/photo-1545239351-ef056c0b01d4?auto=format&fit=crop&w=800&q=80" alt="Beautiful indoor plants" />
                    </div>
                </div>
            </section>

            {/* INOVASI: MATCHMAKER STRIP */}
            <section className="matchmaker-strip">
                <div className="matchmaker-inner">
                    <span className="matchmaker-text">Not sure which plant suits your lifestyle? Let us help!</span>
                    <Link href="/katalog" className="btn-tlb" style={{ background: 'white', color: 'var(--deep-botanic)', boxShadow: 'none' }}>Take the Quiz</Link>
                </div>
            </section>

            {/* VALUES STRIP */}
            <section className="values-strip" id="about">
                <div className="values-strip-inner">
                    {values.map((v) => (
                        <div key={v.title}>
                            <h4 className="value-tlb-title">{v.title}</h4>
                            <p className="value-tlb-desc">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section className="section" id="categories" style={{ background: "var(--bg-soft)" }}>
                <div className="section-inner">
                    <h2 className="section-title">Shop by Category</h2>
                    <div className="cat-photo-grid">
                        {categories.map((cat) => (
                            <Link key={cat.name} href="/katalog" className="cat-photo-card" style={{ backgroundColor: cat.bgColor }}>
                                <img src={cat.photo} alt={cat.name} onError={(e) => e.target.style.display = 'none'} />
                                <span className="cat-photo-name">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* BEST SELLERS SECTION */}
            <section className="section" id="best-sellers" style={{ background: "var(--bg-warm)" }}>
                <div className="section-inner">
                    <h2 className="section-title">Aussie Favourites</h2>
                    <div className="product-grid">
                        {featuredProducts.map((p) => (
                            <Link key={p.name} href="/katalog" className="product-card">
                                <div className="product-card-image" style={{ backgroundColor: p.bgColor }}>
                                    <img src={p.photo} alt={p.name} onError={(e) => e.target.style.display = 'none'} />
                                </div>
                                <div className="product-info">
                                    <h3 className="product-card-name">{p.name}</h3>
                                    <p className="product-card-pot">{p.pot}</p>
                                    <p className="product-card-price">{p.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
                        <Link href="/katalog" className="btn-tlb" style={{ background: "var(--pop-yellow)", color: "var(--deep-botanic)" }}>View All Plants</Link>
                    </div>
                </div>
            </section>

            {/* INOVASI: REVIEW/SOCIAL PROOF SEBELUM FOOTER */}
            <section style={{ padding: "4rem 1.5rem", background: "white", textAlign: "center" }}>
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <div style={{ color: "var(--pop-yellow)", fontSize: "1.5rem", marginBottom: "1rem" }}>★★★★★</div>
                    <p style={{ fontStyle: "italic", fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                        "Absolutely love my new Monstera! It arrived in perfect condition and the ceramic pot looks stunning in my living room. Best plant delivery service in Aus!"
                    </p>
                    <p style={{ fontWeight: "600", color: "var(--deep-botanic)" }}>— Sarah M., Sydney</p>
                </div>
            </section>
        </GuestLayout>
    );
}