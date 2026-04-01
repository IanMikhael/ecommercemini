export const PRODUCTS = [
    { 
        id: 1,  
        name: 'Monstera Deliciosa', 
        category: 'Tropical',     
        price: 100.00, 
        originalPrice: 110.00, 
        img: "/images/1.jpg",
        thumbnails: [
            "/images/1.jpg",
            "/images/2.jpg",
            "/images/3.jpg",
            "/images/4.jpg"
        ],
        badge: '10% OFF',    
        rating: 5.0, 
        reviewsCount: 20,
        longDesc: 'Tanaman ini sangat populer karena bentuk daunnya yang unik dan estetik. Perawatannya cukup mudah, sangat cocok ditempatkan di dalam ruangan dengan cahaya tidak langsung.',
        reviews: [
            { id: 1, name: 'Luke Devis', country: 'UK', date: '2024-07-05 12:00PM', rating: 5, comment: 'Sangat indah! Sesuai dengan deskripsi dan gambar. Daunnya segar dan pengiriman sangat aman.' },
            { id: 2, name: 'Martin Sandy', country: 'USA', date: '2024-07-04 12:00PM', rating: 5, comment: 'Bagus sekali untuk dekorasi ruang tamu saya. Warnanya hijau pekat dan sangat sehat.' }
        ]
    },
    { 
        id: 2,  
        name: 'Snake Plant',   
        category: 'Air Purifier',     
        price: 45.00, 
        originalPrice: null, 
        img: "/images/2.jpg",
        thumbnails: [
            "/images/2.jpg",
            "/images/3.jpg",
            "/images/4.jpg",
            "/images/5.jpg"
        ],
        badge: 'Bestseller',           
        rating: 4.9,
        reviewsCount: 45, 
        longDesc: 'Dikenal juga sebagai Lidah Mertua, tanaman ini juaranya menyaring racun di udara. Hampir tidak bisa mati meski Anda sering lupa menyiramnya.',
        reviews: [
            { id: 3, name: 'Kobe Rexion', country: 'KSA', date: '2024-07-03 12:00PM', rating: 5, comment: 'Tanaman yang sangat tangguh. Cocok untuk saya yang sering sibuk.' }
        ]
    },
    { 
        id: 3,  
        name: 'Peace Lily',   
        category: 'Flowering',     
        price: 55.00, 
        originalPrice: 65.00, 
        img: "/images/3.jpg",
        thumbnails: [
            "/images/3.jpg",
            "/images/4.jpg",
            "/images/5.jpg",
            "/images/7.jpg"
        ],
        badge: 'Sale',           
        rating: 4.7,
        reviewsCount: 12, 
        longDesc: 'Peace Lily tidak hanya cantik dengan bunga putihnya, tetapi juga sangat baik dalam menjaga kelembapan udara ruangan Anda.',
        reviews: [
            { id: 4, name: 'Sarah Lee', country: 'SG', date: '2024-07-01 10:00AM', rating: 4, comment: 'Bunganya mekar dengan indah, tapi butuh penyiraman yang lebih rutin.' }
        ]
    },
    { 
        id: 4,  
        name: 'Aglaonema Silver',   
        category: 'Low Light',     
        price: 85.00, 
        originalPrice: null, 
        img: "/images/4.jpg",
        thumbnails: [
            "/images/4.jpg",
            "/images/5.jpg",
            "/images/7.jpg",
            "/images/8.jpg"
        ],
        badge: '',           
        rating: 4.8,
        reviewsCount: 15, 
        longDesc: 'Pilihan sempurna untuk pemula. Aglaonema sangat toleran terhadap kondisi minim cahaya dan tidak membutuhkan penyiraman yang terlalu sering. Corak daunnya memberikan sentuhan elegan.',
        reviews: [
            { id: 5, name: 'Budi Santoso', country: 'ID', date: '2024-06-28 09:00AM', rating: 5, comment: 'Daunnya rimbun banget, ditaruh di pojok kamar yang agak gelap tetep hidup.' }
        ]
    },
    { 
        id: 5,  
        name: 'Ficus Elastica',   
        category: 'Shade Lovers',     
        price: 120.00, 
        originalPrice: 150.00, 
        img: "/images/5.jpg",
        thumbnails: [
            "/images/5.jpg",
            "/images/8.jpg",
            "/images/7.jpg",
            "/images/9.jpg"
        ],
        badge: 'Rare',           
        rating: 4.9,
        reviewsCount: 33, 
        longDesc: 'Daunnya yang tebal, mengkilap, dan berwarna gelap membuatnya terlihat sangat mewah. Tanaman ini butuh cahaya terang namun tidak langsung.',
        reviews: [
            { id: 6, name: 'John Doe', country: 'UK', date: '2024-06-20 02:00PM', rating: 5, comment: 'Kualitas tanaman luar biasa. Packing sangat aman sampai tujuan.' }
        ]
    },
    { 
        id: 6,  
        name: 'Pothos',   
        category: 'Air Purifier',     
        price: 25.00, 
        originalPrice: null, 
        img: "/images/7.jpg",
        thumbnails: [
            "/images/10.jpg",
            "/images/11.jpg",
            "/images/12.jpg",
            "/images/1.jpg"
        ],
        badge: '',           
        rating: 4.6,
        reviewsCount: 50, 
        longDesc: 'Pothos adalah rajanya tanaman indoor. Tumbuh menjuntai dengan cantik, sangat cocok diletakkan di rak buku atau pot gantung.',
        reviews: [
            { id: 7, name: 'Siti Aminah', country: 'ID', date: '2024-06-15 11:00AM', rating: 4, comment: 'Cepat banget panjangnya, gampang di-stek juga.' }
        ]
    }
];