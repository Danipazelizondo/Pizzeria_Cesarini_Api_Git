import React, { useState } from 'react';
import './Register.css';
import FormInput from '../FormInput';
import PasswordStrength from './PasswordStrength';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const validateField = (name, value) => {
		let error = '';

		switch (name) {
			case 'name':
				if (!value.trim()) error = 'campo obligatorio';
				else if (value.length < 2)
					error = 'El nombre debe tener al menos 2 caracteres';
				else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
					error = 'No se permiten caracteres especiales';
				break;
			case 'email':
				if (!value.trim()) error = 'campo obligatorio';
				else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
					error = 'Por favor, introduce un email válido';
				break;
			case 'password':
				if (!value.trim()) error = 'campo obligatorio';
				else if (value.length < 5)
					error = 'debe tener al menos 6 caracteres';
				else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
					error =
						'debe contener al menos una minúscula, una mayúscula y un número';
				break;
			case 'confirmPassword':
				if (!value.trim()) error = 'Debes confirmar la contraseña';
				else if (value !== formData.password)
					error = 'Las contraseñas no coinciden';
				break;
			default:
				break;
		}

		return error;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		if (errors[name]) {
			setErrors({ ...errors, [name]: '' });
		}
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		const error = validateField(name, value);
		setErrors({ ...errors, [name]: error });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newErrors = {};

		Object.keys(formData).forEach((key) => {
			const error = validateField(key, formData[key]);
			if (error) newErrors[key] = error;
		});

		setErrors(newErrors);

		if (!Object.keys(newErrors).length) {
			setIsSubmitting(true);
			setTimeout(() => {
				setIsSubmitting(false);
				setSubmitSuccess(true);
				setTimeout(() => {
					setSubmitSuccess(false);
				}, 5000);
			}, 1500);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
	    <div className="container mt-5">
			
			<div className="text-center mb-4">
				<h2 className="h3 fw-bold text-dark">Crear cuenta</h2>
				<p className="text-muted">Completa el siguiente formulario para crear una cuenta y pedir de nuestras pizzas artesanales</p>
			</div>

            <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
				<div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="text"
                            name="name"
                            label="Nombre completo"
                            placeholder="Ingresa tu Nombre y Apellido"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                        />

                        <FormInput
                            type="email"
                            name="email"
                            label="Correo electrónico"
                            placeholder="Ej: ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                        />

                        <div className="mb-3">
                            <FormInput
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                label="Contraseña"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password}
                            />

                            <PasswordStrength password={formData.password} />

                            <FormInput
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            placeholder="********"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.confirmPassword}
                            />

                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="registerShowPassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <label 
									htmlFor="showPassword" 
									className="form-check-label"
									>
                                    Mostrar contraseña
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-dark w-100"
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin me-2"></i>
                                        Procesando...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus me-2"></i>
                                        Crear Cuenta
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

			{submitSuccess && (
				<div className="alert alert-success mt-4 text-center" role="alert">
					¡Se ha registrado correctamente!
				</div>
			)}
		</div>
	);
};

export default Register;