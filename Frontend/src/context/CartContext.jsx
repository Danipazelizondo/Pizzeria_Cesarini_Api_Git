import { createContext, useContext, useState } from "react";
import { pizzaCart } from "../pages/Home/Pizzas2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(pizzaCart);

    const incrementaCantidad = (id) => {
        setCart((prevCart) =>
        prevCart.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
        )
        );
    };

    const decreceCantidad = (id) => {
        setCart((prevCart) =>
        prevCart
            .map((item) =>
            item.id === id ? { ...item, count: item.count - 1 } : item
            )
            .filter((item) => item.count > 0)
        );
    };

    const total = cart.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.count),
        0
    );

    return (
    <CartContext.Provider
        value={{
            cart,
            setCart,
            incrementaCantidad,
            decreceCantidad,
            total,
        }}
    >
        {children}
        </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);