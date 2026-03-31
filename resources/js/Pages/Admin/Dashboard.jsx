import AdminLayout from '../../Layouts/AdminLayout';
import StatCard from '../../Components/Admin/StatCard';
import SectionCard, { EmptyState } from '../../Components/Admin/SectionCard';
import { PlantIcon, OrderIcon, UserIcon, CurrencyIcon, ActivityIcon } from '../../Components/Icons';
import { Link } from '@inertiajs/react';
import { quickActions } from '../../Components/Admin/Navigation';

const typeColors = {
    product: { bg: 'rgba(74, 124, 89, 0.1)', text: '#4a7c59', label: 'Produk' },
    order: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', label: 'Pesanan' },
    payment: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6', label: 'Pembayaran' },
};

const actionLabels = {
    create: 'Dibuat',
    update: 'Diperbarui',
    delete: 'Dihapus',
    status_change: 'Status',
    payment: 'Bayar',
    toggle_featured: 'Fitur',
};

function formatCurrency(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

function formatDate(date) {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export default function Dashboard({ productStats, orderStats, transactionStats }) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const stats = [
        {
            name: 'Total Produk',
            value: productStats.total || '0',
            sub: `${productStats.active || 0} aktif`,
            icon: <PlantIcon className='w-5 h-5' />,
            accent: 'var(--stat-products)',
            accentBg: 'var(--stat-products-bg)',
            accentBorder: 'var(--stat-products-border)',
        },
        {
            name: 'Total Pesanan',
            value: orderStats.total || '0',
            sub: `${orderStats.pending || 0} menunggu`,
            icon: <OrderIcon className='w-5 h-5' />,
            accent: 'var(--stat-orders)',
            accentBg: 'var(--stat-orders-bg)',
            accentBorder: 'var(--stat-orders-border)',
        },
        {
            name: 'Total Transaksi',
            value: transactionStats.total || '0',
            sub: `${transactionStats.today || 0} hari ini`,
            icon: <ActivityIcon className='w-5 h-5' />,
            accent: 'var(--stat-revenue)',
            accentBg: 'var(--stat-revenue-bg)',
            accentBorder: 'var(--stat-revenue-border)',
        },
        {
            name: 'Pendapatan',
            value: formatCurrency(orderStats.revenue || 0),
            sub: `${orderStats.completed || 0} pesanan selesai`,
            icon: <CurrencyIcon className='w-5 h-5' />,
            accent: 'var(--stat-revenue)',
            accentBg: 'var(--stat-revenue-bg)',
            accentBorder: 'var(--stat-revenue-border)',
        },
    ];

    return (
        <AdminLayout>
            <div className='page-header'>
                <div>
                    <div className='db-eyebrow'>Home Botanical</div>
                    <h1 className='db-headline'>Dashboard</h1>
                    <p className='db-date'>{today}</p>
                </div>
                <div className='quick-actions'>
                    {quickActions.map((qa) => (
                        <a key={qa.label} href={qa.href} className='qa-btn'>
                            {qa.icon}
                            {qa.label}
                        </a>
                    ))}
                </div>
            </div>

            <div className='welcome-banner'>
                <svg className='banner-leaf' viewBox='0 0 200 300' fill='var(--moss)' style={{ width: 180, height: 280 }}>
                    <path d='M100 280 C100 280 20 200 20 120 C20 50 55 10 100 10 C145 10 180 50 180 120 C180 200 100 280 100 280Z' />
                    <line x1='100' y1='10' x2='100' y2='280' stroke='var(--mist)' strokeWidth='1.5' />
                    <line x1='100' y1='80' x2='45' y2='55' stroke='var(--mist)' strokeWidth='1' />
                    <line x1='100' y1='80' x2='155' y2='55' stroke='var(--mist)' strokeWidth='1' />
                    <line x1='100' y1='130' x2='35' y2='100' stroke='var(--mist)' strokeWidth='1' />
                    <line x1='100' y1='130' x2='165' y2='100' stroke='var(--mist)' strokeWidth='1' />
                    <line x1='100' y1='180' x2='40' y2='155' stroke='var(--mist)' strokeWidth='1' />
                    <line x1='100' y1='180' x2='160' y2='155' stroke='var(--mist)' strokeWidth='1' />
                </svg>
                <div className='banner-content'>
                    <div className='banner-text'>
                        <div className='banner-eyebrow'>Selamat datang</div>
                        <div className='banner-title'>
                            Kelola taman digitalmu<br />dengan penuh kasih.
                        </div>
                        <div className='banner-sub'>
                            Semua dalam kendali Anda — produk, pesanan, dan pelanggan.
                        </div>
                    </div>
                    <div className='status-pill'>
                        <span className='status-dot' />
                        Sistem Aktif
                    </div>
                </div>
            </div>

            <div className='stats-grid'>
                {stats.map((stat) => (
                    <StatCard key={stat.name} {...stat} />
                ))}
            </div>

            <div className='bottom-grid'>
                <SectionCard title='Aktivitas Terbaru'>
                    {transactionStats.recent && transactionStats.recent.length > 0 ? (
                        <div className='activity-list'>
                            {transactionStats.recent.map((log) => {
                                const typeColor = typeColors[log.type] || { bg: 'rgba(156, 163, 175, 0.1)', text: '#6b7280' };
                                return (
                                    <div key={log.id} className='activity-item'>
                                        <div className='activity-icon' style={{ background: typeColor.bg }}>
                                            <span style={{ color: typeColor.text }}>
                                                {log.type === 'product' ? <PlantIcon className='w-4 h-4' /> :
                                                 log.type === 'order' ? <OrderIcon className='w-4 h-4' /> :
                                                 <CurrencyIcon className='w-4 h-4' />}
                                            </span>
                                        </div>
                                        <div className='activity-content'>
                                            <div className='activity-text'>
                                                <span className='activity-action'>{actionLabels[log.action] || log.action}</span>
                                                {' '}
                                                <span className='activity-ref'>{log.reference_number || log.description}</span>
                                            </div>
                                            <div className='activity-meta'>
                                                <span className='activity-time'>{formatDate(log.created_at)}</span>
                                                <span className='activity-by'>oleh {log.performed_by || 'System'}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <Link href='/admin/transactions' className='activity-view-all'>
                                Lihat semua transaksi →
                            </Link>
                        </div>
                    ) : (
                        <EmptyState
                            message='Belum ada aktivitas'
                            subMessage='Aktivitas akan tercatat di sini'
                        />
                    )}
                </SectionCard>

                <div className='side-cards'>
                    <SectionCard title='Ringkasan Minggu Ini' titleDot='var(--moss)'>
                        <div className='status-list'>
                            <div className='summary-item'>
                                <span className='summary-label'>Produk Aktif</span>
                                <span className='summary-value' style={{ color: '#4a7c59' }}>{productStats.active}</span>
                            </div>
                            <div className='summary-item'>
                                <span className='summary-label'>Pesanan Baru</span>
                                <span className='summary-value' style={{ color: '#c4a35a' }}>{orderStats.pending}</span>
                            </div>
                            <div className='summary-item'>
                                <span className='summary-label'>Sedang Diproses</span>
                                <span className='summary-value' style={{ color: '#3b82f6' }}>{orderStats.processing}</span>
                            </div>
                            <div className='summary-item'>
                                <span className='summary-label'>Transaksi</span>
                                <span className='summary-value' style={{ color: '#8b5cf6' }}>{transactionStats.this_week}</span>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title='Status Toko'>
                        <div className='status-list'>
                            {[
                                { label: 'Website', ok: true },
                                { label: 'Database', ok: true },
                                { label: 'Produk', ok: productStats.active > 0 },
                            ].map((item) => (
                                <div key={item.label} className='status-item'>
                                    <span className='status-label'>{item.label}</span>
                                    <span className={`status-badge ${item.ok ? 'status-ok' : 'status-warn'}`}>
                                        <span className='status-indicator' />
                                        {item.ok ? 'Aktif' : 'Periksa'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            </div>
        </AdminLayout>
    );
}
