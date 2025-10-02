import React, { createContext, useContext, useEffect, useState } from "react";

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPizzas = async () => {
        setLoading(true);
        setError(null);
        try {
        const res = await fetch("http://localhost:5000/api/pizzas");
        if (!res.ok) throw new Error("Error al obtener las pizzas");
        const data = await res.json();
        setPizzas(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    const fetchPizzaById = async (id) => {
        setLoading(true);
        setError(null);
        try {
        const res = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!res.ok) throw new Error("Pizza no encontrada");
        const data = await res.json();
        setLoading(false);
        return data;
        } catch (err) {
        setLoading(false);
        setError(err.message);
        return null;
        }
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    return (
        <PizzaContext.Provider
        value={{ pizzas, loading, error, fetchPizzas, fetchPizzaById }}
        >
        {children}
        </PizzaContext.Provider>
    );
    };

export const usePizzas = () => useContext(PizzaContext);