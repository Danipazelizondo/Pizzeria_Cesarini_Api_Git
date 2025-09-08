import React, { useState } from "react";
import {pizzaCart} from '../Home/Pizzas2';
import { formatoPrecio } from "../../utils/formatoPrecio";
import "./Cart.css";

const Cart = () => {
    const [cart, setCart] = useState(pizzaCart);

    const incrementaCantidad = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        );
    };

    const decreceCantidad = (id) => {
        setCart(
        cart
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
        <div className="mt-5 p-2">
            
            <div className="mb-4">
                <h1 className="h3 fw-bold text-dark">🛒 Detalles del pedido</h1>
                <p className="text-muted">Agrega tus pizzas favoritas</p>
            </div>
            
            <div className="mx-auto mb-3" style={{ maxWidth: '500px' }}>
                {cart.length === 0 ? (
                    <p className="empty-cart">Tu carrito está vacío</p>
                ) : (
                    <div>
                        {cart.map((pizza) => (
                            <div key={pizza.id} className="d-flex align-items-center justify-content-between border-bottom py-2">
                                
                                <div className="d-flex align-items-center">
                                    <img
                                        src={pizza.img}
                                        alt={pizza.name}
                                        className="rounded"
                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                    />
                                    <div className="ms-3">
                                        <h6 className="mb-0 fw-semibold text-capitalize">
                                        {pizza.name}
                                        </h6>
                                        <small className="text-muted">
                                        {formatoPrecio(pizza.price)}
                                        </small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => decreceCantidad(pizza.id)}
                                    >
                                        ➖
                                    </button>
                                    <span className="mx-2 fw-bold">{pizza.count}</span>
                                    <button
                                        className="btn btn-outline-success btn-sm"
                                        onClick={() => incrementaCantidad(pizza.id)}
                                    >
                                        ➕
                                    </button>
                                </div>
                            </div>
                        ))}

                        <hr />

                        <h4>Total: {formatoPrecio(total)}</h4>

                        <button className="btn btn-dark w-100 mt-3">Pagar</button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Cart;

