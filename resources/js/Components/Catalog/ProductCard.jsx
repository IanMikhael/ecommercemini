import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    return (
        <div className="flex flex-col h-full rounded-[24px] overflow-hidden bg-[#141f15] border border-white/5 hover:-translate-y-2 hover:border-[#7fff6e]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group">
            
            {/* ── 1. Bagian Gambar ────────────────────────────── */}
            <div className="relative overflow-hidden w-full aspect-[4/5] bg-[#0d150e]">
                <img
                    src={product.img} 
                    alt={product.name} 
                    loading="lazy" 
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#141f15] via-transparent to-transparent opacity-80" />

                {product.badge && (
                    <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-[0.65rem] font-bold tracking-widest uppercase bg-[#ff4747] text-white z-10 shadow-lg">
                        {product.badge}
                    </div>
                )}
                
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full text-[0.7rem] font-bold bg-[#eef4ec] text-[#0a0f0b] flex items-center gap-1.5 z-10 shadow-lg">
                    <span className="text-[#f59e0b]">★</span> {product.rating.toFixed(1)}
                </div>
            </div>

            {/* ── 2. Konten Bawah (DIJAMIN ANTI MEPET) ────────────────────────────── */}
            {/* px-6 dan pb-6 di div ini adalah tembok pelindungnya */}
            <div className="flex flex-col flex-grow px-6 pb-6 pt-4">
                
                {/* Nama Tanaman (Dikembalikan ke ukuran normal) */}
                <h3 className="mb-auto text-center text-[1.3rem] text-[#eef4ec] font-bold tracking-wide leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                    {product.name}
                </h3>

                {/* Harga dan Tombol (Satu Baris) */}
                <div className="flex flex-row items-center justify-between w-full pt-6">
                    
                    {/* Grup Harga */}
                    <div className="flex flex-row items-center gap-2.5">
                        <span className="text-[1.3rem] font-bold text-[#eef4ec]">
                            ${product.price.toFixed(2)}
                        </span>
                        
                        {product.originalPrice && (
                            <span className="text-[0.9rem] line-through text-[#7a9178]">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    
                    {/* Tombol Buy (Diperbesar & Anti Gepeng) */}
                    <Link href={`/product/${product.id}`}
                        className="flex-shrink-0 px-8 py-3.5 rounded-full text-[0.85rem] font-bold uppercase tracking-widest bg-[#2a382b] text-[#eef4ec] hover:bg-[#7fff6e] hover:text-[#0a0f0b] transition-all border border-white/10 hover:border-[#7fff6e] shadow-md">
                        BUY
                    </Link>

                </div>
            </div>

        </div>
    );
}