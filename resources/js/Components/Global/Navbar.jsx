import { Link } from '@inertiajs/react';

export default function Navbar({ cartCount = 0 }) {
    return (
        <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-8 bg-transparent">
            
            {/* 1. Bagian Logo Baru */}
            <Link href="/catalog" className="flex items-center">
                {/* Memanggil logo dari folder public/images/ */}
                <img 
                    src="/images/logo.png" 
                    alt="Home Botanical Logo" 
                    className="h-12 w-auto rounded-xl object-contain shadow-lg"
                />
            </Link>

            {/* 2. Menu Tengah (Hanya Catalog Saja) */}
            <ul className="hidden md:flex text-[0.75rem] font-bold uppercase tracking-widest list-none m-0 p-0">
                <li>
                    <Link href="/catalog" className="text-[#eef4ec] border-b-2 border-[#7fff6e] pb-1 hover:text-[#7fff6e] transition-colors">
                        Catalog
                    </Link>
                </li>
            </ul>

            {/* 3. Ikon Kanan (Cart & User) */}
            <div className="flex items-center gap-6">
                <button className="relative text-[#eef4ec] hover:text-[#7fff6e] transition-colors">
                    {/* Ikon Shopping Bag */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    {/* Badge Notifikasi Angka */}
                    <span className="absolute -top-2 -right-2 bg-[#7fff6e] text-[#0a0f0b] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                </button>
                <button className="text-[#eef4ec] hover:text-[#7fff6e] transition-colors">
                    {/* Ikon User Profile */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </button>
            </div>
        </nav>
    );
}