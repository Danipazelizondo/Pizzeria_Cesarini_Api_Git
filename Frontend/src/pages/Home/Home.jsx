import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from "./components_home/Header";
import { formatoPrecio } from "../../utils/formatoPrecio";
import PizzaApi from "./components_home/PizzaApi"
// import CardPizza from "./components_home/CardPizza";
// import {pizzasData} from './Pizzas2';


const Home =()=> {
    const [pizzas, setPizzas] = useState ([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState (null);

    const handleFetch = async (url) => {
        setFetching(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al obtener las pizzas");
            }
            const data = await response.json();
            setPizzas(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setFetching(false);
        }
    };

        useEffect(() => {
            handleFetch('http://localhost:5000/api/pizzas');
        }, []);

    return (
        <>
            <div className="container">
                {fetching && <h3>Cargando pizzas...</h3>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                        
                {!fetching && !error && (
                    <div className="row">
                        <h1 className="h3 fw-bold text-dark">Nuestras Pizzas</h1>
                        {pizzas.map((pizza) => (
                            <div className="col-md-4 mb-4" key={pizza.id}>
                                <PizzaApi pizza={pizza} /> 
                            </div>
                        ))}
                    </div>
                )}



                {/* Obtiene data desde archivo Pizzas2.js */}
                {/* <div className="row">
                    {pizzasData.map((pizza) => (
                        <div className="col-md-4 mb-4" key={pizza.id}>
                            <CardPizza pizza={pizza} />
                        </div>
                    ))}
                </div> */}

            </div>
        </>
    );

}
    


export default Home;