import { useMemo } from 'react';

const PasswordStrength = ({ password }) => {
	const strength = useMemo(() => {
		if (!password) {
			return {
				strength: 0,
				text: 'Muy débil',
				color: "#dc3545",
			};
		}

		let strengthValue = 0;

		// longitud
		if (password.length > 5) strengthValue += 1;

		// Tiene mayúsculas y minúsculas
		if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strengthValue += 1;

		// Tiene números
		if (password.match(/([0-9])/)) strengthValue += 1;

		// Tiene caracteres especiales
		if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)) strengthValue += 1;

		let text, color;

		switch (strengthValue) {
			case 0:
			case 1:
				text = "Muy débil";
				color = "#dc3545";
				break;
			case 2:
				text = "Débil";
				color = "#fd7e14";
				break;
			case 3:
				text = "Buena";
				color = "#ffc107";
				break;
			case 4:
				text = "Fuerte";
				color = "#28a745";
				break;
			default:
				text = "Muy débil";
				color = "#dc3545";
				break;
		}

		const percentage = strengthValue * 25;

		return {
			strength: percentage,
			text,
			color,
		};
	}, [password]);
    
	return (
		<div className="mt-2">
			<div className="d-flex align-items-center mb-1">
				<div className="progress flex-grow-1 me-2" style={{ height: "4px" }}>
				<div
					className="progress-bar"
					role="progressbar"
					style={{
						width: `${strength.strength}%`,
						backgroundColor: strength.color,
					}}
				></div>
				</div>
				<span className="form-text">{strength.text}</span>
			</div>
		</div>
	);
};

export default PasswordStrength;