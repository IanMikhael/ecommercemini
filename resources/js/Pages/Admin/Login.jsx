import { useForm } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';

export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <GuestLayout>
            <div className="login-container">
                <div className="login-side-bg">
                    <div className="login-brand">
                        <h1 className="login-brand-title">Home Botanical</h1>
                        <p className="login-brand-sub">Admin Dashboard</p>
                    </div>
                </div>

                <div className="login-form-container">
                    <div className="login-form-wrapper">
                        <div className="login-form-header">
                            <h2 className="login-form-title">Login</h2>
                            <p className="login-form-subtitle">Masuk ke dashboard admin</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="form-input"
                                    placeholder="admin@example.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="form-error">{errors.email}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="form-error">{errors.password}</p>
                                )}
                            </div>

                            <button type="submit" className="btn-primary">
                                Masuk
                            </button>
                        </form>

                        <div className="login-back">
                            <a href="/" className="back-link">
                                ← Kembali ke Beranda
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
