import React, { useEffect, useState } from 'react'
import './CardPizza.css';
import { formatoPrecio } from "../../../utils/formatoPrecio";

const PizzaApi =({ pizza })=> {

    return (
        <>
            <div>
                <div className="pizza-card card h-100 shadow-sm">
                    <img src={pizza.img} className="card-img-top" alt={pizza.name} />
                    
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                        <h5 className="card-title fw-bold mb-3">{pizza.name}</h5>
                        
                        <hr />
                        
                        <div className="pizza-ingredients">
                            <p className="ingredients-label">🍕Ingredientes:</p>
                            <ul className="ingredients-list text-start">
                                {pizza.ingredients?.map((ingrediente) => (
                                <li key={ingrediente}>{ingrediente}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <hr />
                        
                        <p className="pizza-price"> Precio: {formatoPrecio(pizza.price)}</p>

                        <div className="d-flex justify-content-center gap-2 mt-3">
                            <button className="btn btn-outline-secondary btn-sm">Ver Más 👀</button>
                            <button className="btn btn-dark btn-sm">Añadir 🛒</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PizzaApi