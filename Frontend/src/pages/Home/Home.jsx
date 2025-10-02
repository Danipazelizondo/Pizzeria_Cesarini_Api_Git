import React from 'react';
import {usePizzas} from "../../context/PizzaContext"
import './Home.css';
import PizzaApi from "./components_home/PizzaApi"
import { Link } from "react-router-dom";
// import CardPizza from "./components_home/CardPizza";
// import {pizzasData} from './Pizzas2';


const Home =()=> {
    const { pizzas, loading, error } = usePizzas();

    return (
        <>
            <div className="container">
                {loading && <h3>Cargando pizzas...</h3>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                        
                {!loading && !error && (
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