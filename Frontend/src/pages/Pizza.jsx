import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePizzas } from "../context/PizzaContext";
import { useCart } from "../context/CartContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import "./Home/components_home/CardPizza.css";
import "./Home/Home.css";


const Pizza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchPizzaById, loading, error } = usePizzas();
    const [pizza, setPizza] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadPizza = async () => {
        const data = await fetchPizzaById(id);
        setPizza(data);
        };
        loadPizza();
    }, [id]);

    if (loading) return <p>Cargando pizza...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!pizza) return <p>No se encontró la pizza</p>;

    return (
        <>
            <div className="container" style={{ paddingTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-6 mb-4">
                        <div className="pizza-card card h-100 shadow-sm">
                            <img src={pizza.img} className="card-img-top" alt={pizza.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">{pizza.name}</h5>
                                <p className="card-text text-muted">{pizza.desc}</p>
                                <ul className="text-start">
                                    {pizza.ingredients.map((i) => (
                                    <li key={i}>{i}</li>
                                    ))}
                                </ul>
                                <p className="pizza-price">Precio: {formatoPrecio(pizza.price)}</p>
                                <div className="d-flex justify-content-center gap-2 mt-3">
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => navigate("/")}
                                    >
                                        Volver
                                    </button>
                                    
                                    <button
                                        className="btn btn-dark btn-sm"
                                        onClick={() => addToCart(pizza)}
                                    >
                                        Añadir 🛒
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pizza