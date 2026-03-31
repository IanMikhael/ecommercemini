import { useForm } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { ArrowLeftIcon } from "../../../Components/Icons";
import { Link } from "@inertiajs/react";
import FormField from "../../../Components/Admin/FormField";

export default function Edit({ product, categories }) {
    const { data, setData, put, errors, processing } = useForm({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price || "",
        original_price: product.original_price || "",
        stock: product.stock || 0,
        sku: product.sku || "",
        image: product.image || "",
        category: product.category || "",
        status: product.status || "draft",
        plant_type: product.plant_type || "indoor",
        scientific_name: product.scientific_name || "",
        light_requirement: product.light_requirement || "",
        water_requirement: product.water_requirement || "",
        care_instructions: product.care_instructions || "",
        is_featured: product.is_featured || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/products/${product.id}`, {
            onSuccess: () => {},
        });
    };

    const categoryOptions = [{ value: "", label: "Pilih Kategori" }, ...categories];
    const statusOptions = [
        { value: "draft", label: "Draft - Belum dipublikasi" },
        { value: "active", label: "Aktif - Dipublikasi" },
        { value: "archived", label: "Arsip - Disembunyikan" },
    ];
    const plantTypeOptions = [
        { value: "indoor", label: "Indoor" },
        { value: "outdoor", label: "Outdoor" },
        { value: "both", label: "Indoor & Outdoor" },
    ];
    const lightOptions = [
        { value: "", label: "Pilih" },
        { value: "low", label: "Rendah - Teduh" },
        { value: "medium", label: "Sedang - Semi Teduh" },
        { value: "high", label: "Tinggi - Terang" },
    ];
    const waterOptions = [
        { value: "", label: "Pilih" },
        { value: "low", label: "Rendah - Siram jarang" },
        { value: "medium", label: "Sedang - Siram teratur" },
        { value: "high", label: "Tinggi - Siram sering" },
    ];

    return (
        <AdminLayout>
            <div className="page-header">
                <div className="header-back">
                    <Link href="/admin/products" className="back-link-btn">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Kembali
                    </Link>
                    <div>
                        <div className="db-eyebrow">Edit Produk</div>
                        <h1 className="db-headline">{product.name}</h1>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-grid">
                    <div className="form-section">
                        <h3 className="form-section-title">Informasi Utama</h3>
                        <FormField
                            label="Nama Produk"
                            name="name"
                            value={data.name}
                            onChange={(val) => setData("name", val)}
                            error={errors.name}
                            placeholder="Contoh: Monstera Deliciosa"
                            required
                        />
                        <FormField
                            label="Slug"
                            name="slug"
                            value={data.slug}
                            onChange={(val) => setData("slug", val)}
                            error={errors.slug}
                            placeholder="auto-generate dari nama"
                        />
                        <FormField
                            label="Deskripsi"
                            name="description"
                            type="textarea"
                            value={data.description}
                            onChange={(val) => setData("description", val)}
                            error={errors.description}
                            placeholder="Deskripsi produk..."
                            rows={4}
                        />
                        <div className="form-row">
                            <FormField
                                label="Kategori"
                                name="category"
                                type="select"
                                value={data.category}
                                onChange={(val) => setData("category", val)}
                                options={categoryOptions}
                            />
                            <FormField
                                label="Tipe Tanaman"
                                name="plant_type"
                                type="select"
                                value={data.plant_type}
                                onChange={(val) => setData("plant_type", val)}
                                options={plantTypeOptions}
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Harga & Stok</h3>
                        <div className="form-row">
                            <FormField
                                label="Harga Jual"
                                name="price"
                                type="number"
                                value={data.price}
                                onChange={(val) => setData("price", val)}
                                error={errors.price}
                                placeholder="0"
                                prefix="Rp"
                                min={0}
                                required
                            />
                            <FormField
                                label="Harga Asli (Coret)"
                                name="original_price"
                                type="number"
                                value={data.original_price}
                                onChange={(val) => setData("original_price", val)}
                                placeholder="0"
                                prefix="Rp"
                                min={0}
                            />
                        </div>
                        <div className="form-row">
                            <FormField
                                label="Stok"
                                name="stock"
                                type="number"
                                value={data.stock}
                                onChange={(val) => setData("stock", val)}
                                error={errors.stock}
                                placeholder="0"
                                min={0}
                                required
                            />
                            <FormField
                                label="SKU"
                                name="sku"
                                value={data.sku}
                                onChange={(val) => setData("sku", val)}
                                error={errors.sku}
                                placeholder="Contoh: MONS-001"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Detail Tanaman</h3>
                        <FormField
                            label="Nama Ilmiah"
                            name="scientific_name"
                            value={data.scientific_name}
                            onChange={(val) => setData("scientific_name", val)}
                            placeholder="Contoh: Monstera deliciosa"
                        />
                        <div className="form-row">
                            <FormField
                                label="Kebutuhan Cahaya"
                                name="light_requirement"
                                type="select"
                                value={data.light_requirement}
                                onChange={(val) => setData("light_requirement", val)}
                                options={lightOptions}
                            />
                            <FormField
                                label="Kebutuhan Air"
                                name="water_requirement"
                                type="select"
                                value={data.water_requirement}
                                onChange={(val) => setData("water_requirement", val)}
                                options={waterOptions}
                            />
                        </div>
                        <FormField
                            label="Petunjuk Perawatan"
                            name="care_instructions"
                            type="textarea"
                            value={data.care_instructions}
                            onChange={(val) => setData("care_instructions", val)}
                            rows={3}
                            placeholder="Petunjuk perawatan tanaman..."
                        />
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Media & Pengaturan</h3>
                        <FormField
                            label="URL Gambar"
                            name="image"
                            type="url"
                            value={data.image}
                            onChange={(val) => setData("image", val)}
                            error={errors.image}
                            placeholder="https://..."
                            imagePreview
                        />
                        <FormField
                            label="Status Publikasi"
                            name="status"
                            type="select"
                            value={data.status}
                            onChange={(val) => setData("status", val)}
                            options={statusOptions}
                        />
                        <FormField
                            label="Tampilkan di Produk Unggulan"
                            name="is_featured"
                            type="checkbox"
                            value={data.is_featured}
                            onChange={(val) => setData("is_featured", val)}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Link href="/admin/products" className="btn-secondary">
                        Batal
                    </Link>
                    <button type="submit" className="btn-primary" disabled={processing}>
                        {processing ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
