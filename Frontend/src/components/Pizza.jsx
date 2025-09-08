import React, { useEffect, useState } from 'react'
import { formatoPrecio } from "../utils/formatoPrecio"
import './Home/components_home/CardPizza.css';
import "./Home/Home.css"

const Pizza =()=> {
    const [pizza, setPizza] = useState (null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState (null);

    const handleFetch = async (url) => {
        setFetching(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al obtener la pizza");
            }
            const data = await response.json();
            setPizza(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        handleFetch('http://localhost:5000/api/pizzas/p001');
    }, []);

    useEffect(() => {
        console.log("Pizza cargada:", pizza);
    }, [pizza]);

    return (
        <>
            <div className="home-container">
                {fetching && <h3>Cargando pizza...</h3>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!fetching && !error && pizza && (
                    <div className="row justify-content-center">
                    <div className="col-md-6 mb-4">
                        <div className="pizza-card card h-100 shadow-sm">
                            <img src={pizza.img} className="card-img-top" alt={pizza.name} />
                            <div className="card-body text-center d-flex flex-column justify-content-between">
                                <h5 className="card-title fw-bold mb-3">{pizza.name}</h5>
                                <h6 className="card-text text-muted fw-light lh-sm mb-3">{pizza.desc}</h6>

                                <hr />

                                <div className="pizza-ingredients">
                                    <p className="ingredients-label">🍕 Ingredientes:</p>
                                    <ul className="ingredients-list text-start">
                                        {pizza.ingredients?.map((ingrediente) => (
                                            <li key={ingrediente}>{ingrediente}</li>
                                        ))}
                                    </ul>
                                </div>

                                <hr />

                                <p className="pizza-price">Precio: {formatoPrecio(pizza.price)}</p>

                                <div className="d-flex justify-content-center gap-2 mt-3">
                                    <button className="btn btn-outline-secondary btn-sm">Volver</button>
                                    <button className="btn btn-dark btn-sm">Añadir 🛒</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}

export default Pizza