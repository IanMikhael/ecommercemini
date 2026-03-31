export default function StatCard({ name, value, sub, icon, accent, accentBg, accentBorder }) {
    return (
        <div
            className="stat-card"
            style={{ "--card-accent": accent }}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <div className="stat-label">{name}</div>
                    <div className="stat-value">{value}</div>
                    <div className="stat-sub">{sub}</div>
                </div>
                <div
                    className="stat-icon-wrap"
                    style={{
                        background: accentBg,
                        border: `1px solid ${accentBorder}`,
                        color: accent,
                    }}
                >
                    {icon}
                </div>
            </div>
            <div className="stat-sparkline">
                <div className="stat-sparkline-bar" style={{ background: accent }} />
            </div>
        </div>
    );
}
