const FormInput = ({
	type,
	name,
	label,
	icon,
	placeholder,
	value,
	onChange,
	onBlur,
	error,
	showPasswordToggle = false,
	onTogglePassword,
}) => {
	return (
        <div className="mb-3">
			
			<label htmlFor={name} className="form-label">
				{icon && <i className={`${icon} me-2 text-primary`}></i>}
				{label}
			</label>

			<div className="position-relative">
				<input
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					placeholder={placeholder}
					className={`form-control custom-input ${
						error
							? 'is-invalid'
							: value && !error
							? 'is-valid'
							: ''
					}`}
				/>

				{icon && (
					<i
						className={`${icon} position-absolute top-50 start-0 translate-middle-y ms-2 text-muted`}
					></i>
				)}

				{showPasswordToggle && (
					<button
						type="button"
						onClick={onTogglePassword}
						className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
					>
						<i
							className={type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'}
						></i>
					</button>
				)}
			</div>

			{error && <div className="invalid-feedback d-block">{error}</div>}
		</div>
	);
};


export default FormInput;