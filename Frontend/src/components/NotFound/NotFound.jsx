import { Link } from "react-router-dom";
import "./NotFound.css";
import burntPizza from "../../assets/img/burntPizza.png";

const NotFound = () => {
    return (
        <div className="notfound-container container">
            <img 
                src={burntPizza} 
                alt="Pizza quemada - Página no encontrada" 
                className="notfound-img"
            />
            <h1 className="notfound-title">404 - ¡Oops! Esa pizza se nos quemó 🍕🔥</h1>
            <p className="notfound-text">La página que buscas no existe.</p>
            <Link to="/" className="btn btn-dark notfound-btn fas me-2">
                Volver al Home
            </Link>
        </div>
    );
};

export default NotFound;