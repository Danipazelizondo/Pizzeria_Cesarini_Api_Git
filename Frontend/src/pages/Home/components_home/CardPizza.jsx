import React from 'react'
import './CardPizza.css';
import { formatoPrecio } from "../../../utils/formatoPrecio";


const CardPizza = ({ pizza }) => {
    const { name, img, ingredients, price } = pizza;
    
    return (
        <div className="col mb-4">
            <div className="pizza-card card h-100 shadow-sm">
                <img src={img} className="card-img-top" alt={name} />
                
                <div className="card-body text-center d-flex flex-column justify-content-between">
                    <h5 className="card-title fw-bold mb-3">{name}</h5>

                    <hr />

                    <div className="pizza-ingredients">
                        <p className="ingredients-label">🍕Ingredientes:</p>
                        <ul className="ingredients-list text-start">
                            {ingredients.map((ingrediente, index) => (
                            <li key={index}> {ingrediente}</li>
                            ))}
                        </ul>
                    </div>

                    <hr />

                    <p className="pizza-price"> Precio: {formatoPrecio(price)}</p>
                

                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <button className="btn btn-outline-secondary btn-sm">Ver Más 👀</button>
                        <button className="btn btn-dark btn-sm">Añadir 🛒</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPizza;