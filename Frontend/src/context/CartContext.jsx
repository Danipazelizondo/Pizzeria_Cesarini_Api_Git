import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

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

    const addToCart = (pizza) => {
        setCart((prevCart) => {
            const existe = prevCart.find((item) => item.id === pizza.id);
            if (existe) {
                return prevCart.map((item) =>
                    item.id === pizza.id ? { ...item, count: item.count + 1 } : item
                );
            } else {
                return [...prevCart, { ...pizza, count: 1 }];
            }
        });
    };

    const clearCart = () => setCart([]);

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
            addToCart,
            clearCart,
            total,
        }}
    >
        {children}
        </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);