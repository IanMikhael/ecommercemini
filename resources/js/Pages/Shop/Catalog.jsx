import { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';

// Import komponen
import { PRODUCTS } from '../../Constants/products';
import Navbar from '../../Components/Global/Navbar';
import Footer from '../../Components/Global/Footer';
import ProductCard from '../../Components/Catalog/ProductCard';

export default function Catalog() {
    // State untuk fungsi Filter & Search
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Plants');
    const [priceRange, setPriceRange] = useState(200); // Max default $200

    const categories = ['All Plants', 'Tropical', 'Air Purifier', 'Flowering', 'Low Light', 'Shade Lovers'];

    // Logika Pintar: Filter produk secara real-time
    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory = activeCategory === 'All Plants' || product.category === activeCategory;
            const matchPrice = product.price <= priceRange;
            return matchSearch && matchCategory && matchPrice;
        });
    }, [searchQuery, activeCategory, priceRange]);

    return (
        <div className="min-h-screen bg-[#0a0f0b] text-[#eef4ec] font-sans selection:bg-[#7fff6e] selection:text-[#0a0f0b]">
            <Head title="Shop Products — PlantD" />
            
            <Navbar cartCount={0} />

            {/* ── Hero Banner ─────────────────────────────────────────────── */}
            <section className="relative w-full h-[45vh] flex items-center justify-center overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1600" 
                    className="absolute inset-0 w-full h-full object-cover opacity-25" 
                    alt="Hero Banner" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0b] via-[#0a0f0b]/40 to-transparent" />
                
                <div className="relative z-10 text-center px-6 mt-16">
                    <div className="text-[#7fff6e] text-[0.65rem] font-bold uppercase tracking-widest mb-4">
                        Home <span className="text-[#7a9178] mx-2">/</span> Shop <span className="text-[#7a9178] mx-2">/</span> All Products
                    </div>
                    <h1 className="text-5xl md:text-6xl text-[#eef4ec] font-bold tracking-wide mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
                        Shop Products
                    </h1>
                    <p className="text-[#7a9178] text-[0.85rem] max-w-md mx-auto leading-relaxed">
                        Discover our curated collection of indoor plants to bring life and fresh air into your space.
                    </p>
                </div>
            </section>

            {/* ── Main Catalog Section ──────────────────────────────────────── */}
            <main className="max-w-[1300px] mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                
                {/* ── Sidebar Filter (Sticky) ───────────────────────────────── */}
                <aside className="w-full lg:w-[260px] flex-shrink-0 lg:sticky lg:top-32 h-fit">
                    <h3 className="text-xl font-bold mb-8 text-[#eef4ec]" style={{ fontFamily: 'Fraunces, serif' }}>
                        Filter Product
                    </h3>
                    
                    {/* Opsi B: Sleek Minimalist Categories */}
                    <div className="mb-12">
                        <h4 className="text-[0.7rem] font-bold uppercase tracking-widest mb-4 text-[#7a9178] border-b border-white/10 pb-3">
                            Categories
                        </h4>
                        <ul className="flex flex-col gap-2 text-[0.85rem]">
                            {categories.map(cat => {
                                const isActive = activeCategory === cat;
                                return (
                                    <li key={cat}>
                                        <button 
                                            onClick={() => setActiveCategory(cat)}
                                            className={`w-full text-left py-2.5 px-4 transition-all duration-300 border-l-[3px] rounded-r-xl ${
                                                isActive 
                                                    ? 'border-[#7fff6e] text-[#7fff6e] font-bold bg-[#7fff6e]/5' 
                                                    : 'border-transparent text-[#a0b8a0] hover:text-[#eef4ec] hover:bg-white/5'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Custom Price Slider */}
                    <div className="mb-8">
                        <h4 className="text-[0.7rem] font-bold uppercase tracking-widest mb-4 text-[#7a9178] border-b border-white/10 pb-3">
                            Price Range
                        </h4>
                        <div className="group relative pt-2 mb-4">
                            <input 
                                type="range" 
                                min="0" 
                                max="500" 
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-1.5 appearance-none bg-white/10 rounded-full outline-none
                                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7fff6e] 
                                           [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
                                           group-hover:[&::-webkit-slider-thumb]:w-5 group-hover:[&::-webkit-slider-thumb]:h-5
                                           group-hover:[&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(127,255,110,0.6)]" 
                            />
                        </div>
                        <div className="flex justify-between items-center text-[0.75rem] font-medium">
                            <span className="text-[#7a9178]">$0</span>
                            <span className="text-[#7fff6e] px-3 py-1 bg-[#141f15] rounded-lg border border-white/10">
                                Up to ${priceRange}
                            </span>
                        </div>
                    </div>
                </aside>

                {/* ── Right Side (Search & Grid) ────────────────────────────── */}
                <div className="flex-1 w-full">
                    
                    {/* Glowing Search Bar (Versi Diperbesar) */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <div className="relative flex-1 flex items-center bg-[#141f15] border border-white/10 rounded-full px-6 py-4 md:py-5 transition-all duration-300 focus-within:border-[#7fff6e] focus-within:shadow-[0_0_25px_rgba(127,255,110,0.2)] group">
                                
                                {/* Ikon Kaca Pembesar (Membesar & Bebas Tumpuk) */}
                                <svg className="text-[#7a9178] group-focus-within:text-[#7fff6e] transition-colors flex-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"/>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                </svg>
                                
                                {/* Input Field (Teks Lebih Besar) */}
                                <input 
                                    type="text" 
                                    placeholder="Search plants by name..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none px-5 text-base md:text-lg text-[#eef4ec] placeholder-[#7a9178] w-full"
                                />

                                {/* Tombol Clear (X) - Muncul jika ada teks */}
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="text-[#7a9178] hover:text-[#ff6b6b] transition-colors flex-shrink-0 p-2"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18"/>
                                            <line x1="6" y1="6" x2="18" y2="18"/>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                    {/* Header Hasil Grid */}
                    <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-[#eef4ec]" style={{ fontFamily: 'Fraunces, serif' }}>
                            {activeCategory}
                        </h2>
                        <span className="text-[0.75rem] text-[#7a9178] font-bold uppercase tracking-widest bg-[#141f15] px-4 py-2 rounded-full border border-white/5">
                            {filteredProducts.length} Results
                        </span>
                    </div>

                    {/* Grid List Produk */}
                    {filteredProducts.length === 0 ? (
                        <div className="w-full py-20 text-center border border-white/5 border-dashed rounded-3xl bg-[#141f15]/50">
                            <div className="text-4xl mb-4">🪴</div>
                            <h3 className="text-lg font-bold text-[#eef4ec] mb-2">No plants found</h3>
                            <p className="text-sm text-[#7a9178] mb-6">Try adjusting your search or filter criteria.</p>
                            <button 
                                onClick={() => { setSearchQuery(''); setActiveCategory('All Plants'); setPriceRange(500); }} 
                                className="text-[#7fff6e] text-sm font-bold border-b border-[#7fff6e] pb-1 hover:text-white hover:border-white transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}