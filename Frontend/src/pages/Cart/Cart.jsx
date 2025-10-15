import React from "react";
import { useCart} from '../../context/CartContext';
import { formatoPrecio } from "../../utils/formatoPrecio";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Cart.css";

const Cart = () => {
    const { cart, incrementaCantidad, decreceCantidad, total } = useCart();
    const navigate = useNavigate();
    const { token } = useUser();

    return (
        <div className="container" style={{ paddingTop: "80px" }}>
            <div className="mb-4">
                <h1 className="h3 fw-bold text-dark">🛒 Detalles del pedido</h1>
            </div>
            
            <div className="mx-auto mb-3" style={{ maxWidth: '500px' }}>
                {cart.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="empty-cart fw-semibold mb-2" style={{ fontSize: "1.1rem" }}>
                            Tu carrito está vacío
                        </p>
                        <p className="text-muted mb-0">
                            Agrega tus pizzas favoritas para comenzar 🍕
                        </p>
                        <p className="fw-bold mt-3">0 productos</p>
                    </div>
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

                        <button 
                            className="btn btn-dark w-100 mt-3"
                            disabled={!token}
                            onClick={() => token && navigate("/checkout")}
                        >
                            {token ? "Pagar" : "Inicia sesión para pagar"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;