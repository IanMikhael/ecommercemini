import { EmptyStateIcon } from "../Icons";

export default function SectionCard({ title, children, titleDot = true, headerAction }) {
    return (
        <div className="section-card">
            <div className="section-header">
                <div className="section-title">
                    {titleDot && <span className="section-title-dot" />}
                    {title}
                </div>
                {headerAction && (
                    <span className="section-action">{headerAction}</span>
                )}
            </div>
            {children}
        </div>
    );
}

export function EmptyState({ message, subMessage }) {
    return (
        <div className="empty-state">
            <div className="empty-icon">
                <EmptyStateIcon style={{ width: 22, height: 22 }} />
            </div>
            <div>
                <div className="empty-title">{message}</div>
                {subMessage && <div className="empty-text">{subMessage}</div>}
            </div>
        </div>
    );
}
