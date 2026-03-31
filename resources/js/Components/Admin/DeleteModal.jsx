export default function DeleteModal({ show, title, itemName, onClose, onConfirm, processing }) {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title || "Hapus Data"}</h3>
                </div>
                <div className="modal-body">
                    <p>Apakah Anda yakin ingin menghapus "{itemName}"?</p>
                    <p className="modal-warning">Tindakan ini tidak dapat dibatalkan.</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="btn-secondary" disabled={processing}>
                        Batal
                    </button>
                    <button onClick={onConfirm} className="btn-danger" disabled={processing}>
                        {processing ? "Menghapus..." : "Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
