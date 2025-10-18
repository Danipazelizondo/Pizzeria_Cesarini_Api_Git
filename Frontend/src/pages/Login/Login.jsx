import React, { useState } from 'react';
import './Login.css';
import FormInput from '../../components/FormInput';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, loading } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!value.trim()) error = 'Campo obligatorio';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                error = 'Por favor, introduce un email válido';
                break;
            case 'password':
                if (!value.trim()) error = 'Campo obligatorio';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        setSubmitError('');
        try {
            await login(formData);
            navigate('/Profile');
        } catch (err) {
            setSubmitError(err?.response?.data?.message || 'Correo o contraseña incorrectos');
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="container">
        <div className="text-center mb-4">
            <h2 className="h3 fw-bold text-dark">Iniciar Sesión</h2>
            <p className="text-muted">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>

        <div className="card shadow-sm mx-auto login-card" style={{ maxWidth: '400px' }}>
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    label="Correo electrónico"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                />

                <FormInput
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Contraseña"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    showPasswordToggle
                    onTogglePassword={togglePasswordVisibility}
                />

                {submitError && (
                <div className="alert alert-danger text-center">
                    {submitError}
                </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="btn btn-dark w-100"
                >
                {loading ? (
                    <>
                    <i className="fas fa-spinner fa-spin me-2"></i> Procesando...
                    </>
                ) : (
                    <>
                    <i className="fas fa-sign-in-alt me-2"></i> Iniciar Sesión
                    </>
                )}
                </button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Login;