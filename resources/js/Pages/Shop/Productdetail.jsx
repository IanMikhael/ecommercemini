import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

// Import Data & Komponen Global
import { PRODUCTS } from '../../Constants/products';
import Navbar from '../../Components/Global/Navbar';
import Footer from '../../Components/Global/Footer';

export default function ProductDetail({ productId = 1 }) { 
    const product = PRODUCTS.find(p => p.id === Number(productId)) || PRODUCTS[0];
    const [activeImg, setActiveImg] = useState(product.img);
    const [qty, setQty] = useState(1);

    return (
        // PERBAIKAN: Tambah flex flex-col agar footer terdorong ke bawah
        <div className="min-h-screen flex flex-col bg-[#0a0f0b] text-[#eef4ec] font-sans selection:bg-[#7fff6e] selection:text-[#0a0f0b]">
            <Head title={`${product.name} — PlantD`} />
            
            <Navbar cartCount={0} />

            {/* Top Banner */}
            <section className="relative w-full h-[30vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                <img 
                    src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1600" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20" 
                    alt="Banner" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0b] via-transparent to-transparent" />
                <div className="relative z-10 text-center mt-12">
                    <div className="text-[#7fff6e] text-[0.65rem] font-bold uppercase tracking-widest mb-3">
                        Shop <span className="text-[#7a9178] mx-2">/</span> {product.category}
                    </div>
                    <h1 className="text-4xl text-[#eef4ec] font-bold tracking-wide" style={{ fontFamily: 'Fraunces, serif' }}>
                        Product Details
                    </h1>
                </div>
            </section>

            {/* Main Content Area: flex-grow agar mengisi ruang kosong */}
            <main className="flex-grow w-full max-w-[1250px] mx-auto px-6 md:px-12 pt-16">
                
                {/* ── ATAS: Galeri & Info Produk ────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-12 lg:gap-20 items-start">
                    
                    {/* KIRI: Galeri */}
                    <div className="flex flex-col gap-5 w-full max-w-md mx-auto lg:max-w-none">
                        <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#141f15] border border-white/5 shadow-2xl">
                            <img src={activeImg} alt={product.name} className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.thumbnails.map((thumb, idx) => (
                                <button key={idx} onClick={() => setActiveImg(thumb)} className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImg === thumb ? 'border-[#7fff6e] shadow-[0_0_15px_rgba(127,255,110,0.2)]' : 'border-white/5 hover:border-white/20'}`}>
                                    <img src={thumb} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" alt={`Thumbnail ${idx+1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* KANAN: Detail */}
                    <div className="flex flex-col pt-2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#eef4ec] leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                            {product.name}
                        </h2>
                        
                        <div className="flex items-end gap-4 mb-6">
                            <span className="text-3xl font-bold text-[#7fff6e]">${product.price.toFixed(2)}</span>
                            {product.originalPrice && <span className="text-xl line-through text-[#7a9178] mb-1">${product.originalPrice.toFixed(2)}</span>}
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="px-3 py-1 rounded-full bg-[#141f15] border border-white/5 flex items-center gap-1">
                                <span className="text-[#f59e0b] text-sm">★</span> 
                                <span className="font-bold text-sm text-[#eef4ec]">{product.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-[#7a9178] text-sm font-medium">{product.reviewsCount} Reviews</span>
                        </div>

                        <p className="text-[#a0b8a0] text-[0.95rem] leading-relaxed mb-10">
                            {product.longDesc} <span className="text-[#7fff6e] font-bold cursor-pointer hover:underline">See More</span>
                        </p>

                        <div className="w-full h-px bg-white/10 mb-8" />

                        <div className="flex flex-wrap items-center gap-6 lg:gap-10 mb-12">
                            <div className="flex items-center gap-4">
                                <span className="text-[0.7rem] font-bold text-[#7a9178] uppercase tracking-widest">Quantity</span>
                                <div className="flex items-center bg-[#141f15] border border-white/10 rounded-full p-1.5">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-[#7fff6e] hover:text-[#0a0f0b] transition-colors">−</button>
                                    <span className="w-12 text-center font-bold text-[#eef4ec]">{qty}</span>
                                    <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-[#7fff6e] hover:text-[#0a0f0b] transition-colors">+</button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[0.7rem] font-bold text-[#7a9178] uppercase tracking-widest">Total</span>
                                <span className="text-2xl font-bold text-[#eef4ec]">${(product.price * qty).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <button className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-[#141f15] border border-white/10 text-[#7a9178] hover:border-[#7fff6e] hover:text-[#7fff6e] transition-all"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                            <button className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-[#141f15] border border-white/10 text-[#7a9178] hover:border-[#eef4ec] hover:text-[#eef4ec] transition-all"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>
                            <button className="flex-1 min-w-[140px] h-14 rounded-2xl border-2 border-[#7fff6e] text-[#7fff6e] font-bold text-[0.75rem] uppercase tracking-widest hover:bg-[#7fff6e]/10 transition-all">Add to Cart</button>
                            <button className="flex-1 min-w-[140px] h-14 rounded-2xl bg-[#7fff6e] text-[#0a0f0b] font-bold text-[0.75rem] uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_20px_rgba(127,255,110,0.2)]">Buy Now</button>
                        </div>
                    </div>
                </div>

                {/* ── SPACER 1: Jarak mutlak antara konten Atas dan Review ── */}
                <div className="w-full h-24 lg:h-32"></div>

                {/* ── BAWAH: Bagian Ulasan (Reviews) ─────────────────────────────────── */}
                <div className="w-full max-w-[1000px] mx-auto">
                    <div className="w-full py-5 bg-[#141f15] text-center font-bold text-[#eef4ec] text-[0.85rem] uppercase tracking-widest border border-white/5 rounded-t-2xl">
                        Customer Reviews
                    </div>
                    
                    <div className="flex flex-col gap-4 mt-4">
                        {product.reviews.map(rev => (
                            <div key={rev.id} className="p-8 bg-[#141f15] rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eef4ec" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#eef4ec] text-[0.95rem]">
                                                {rev.name} <span className="text-[#7a9178] text-[0.65rem] font-bold uppercase tracking-widest ml-2 bg-white/5 px-2 py-0.5 rounded-full">{rev.country}</span>
                                            </div>
                                            <div className="text-[#f59e0b] text-sm mt-1 flex items-center gap-2">
                                                <span>★★★★★</span> 
                                                <span className="text-[#eef4ec] font-bold">{rev.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[#7a9178] text-[0.75rem]">{rev.date}</div>
                                </div>
                                <div>
                                    <span className="text-[0.7rem] font-bold text-[#7a9178] uppercase tracking-widest block mb-2">Comment :</span>
                                    <p className="text-[#a0b8a0] text-[0.9rem] leading-relaxed">{rev.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="w-full mt-6 py-5 rounded-2xl border border-white/10 text-[#eef4ec] font-bold text-[0.75rem] uppercase tracking-widest hover:border-[#7fff6e] hover:text-[#7fff6e] hover:bg-[#7fff6e]/5 transition-all">
                        Load More Reviews
                    </button>
                </div>

                {/* ── SPACER 2: Jarak mutlak antara Review dan Footer ── */}
                <div className="w-full h-24 lg:h-40"></div>

            </main>

            <Footer />
        </div>
    );
}