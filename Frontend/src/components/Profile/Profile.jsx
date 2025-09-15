import React from "react";
import "./Profile.css";

const Profile = () => {

    const userEmail = "usuario@ejemplo.com";
    const pastOrders = [
        { id: 1, name: "Pizza Napolitana", date: "10/09/2025", price: 5950 },
        { id: 2, name: "Pizza Pepperoni", date: "05/08/2025", price: 6500 },
        { id: 3, name: "Pizza Vegetariana", date: "20/07/2025", price: 6200 },
    ];

    return (
        <div className="container">
            <div className="text-center mb-4">
                <h2 className="h3 fw-bold text-dark">Perfil de Usuario</h2>
                <p className="text-muted">Revisa tu información y tus pedidos anteriores</p>
            </div>

            <div
                className="card shadow-sm mx-auto profile-card"
                style={{ maxWidth: "500px" }}
            >
                <div className="card-body text-center">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Foto de perfil"
                    className="rounded-circle mb-3 profile-img"
                />

                <p className="fw-bold mb-1">Correo electrónico</p>
                <p className="text-muted mb-4">{userEmail}</p>

                <hr />

                <h5 className="fw-bold mb-3">Órdenes pasadas</h5>
                {pastOrders.length > 0 ? (
                    <ul className="list-group mb-4 text-start">
                    {pastOrders.map((order) => (
                        <li
                        key={order.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        >
                        <div>
                            <p className="mb-1 fw-bold">{order.name}</p>
                            <small className="text-muted">Fecha: {order.date}</small>
                        </div>
                        <span className="badge bg-dark rounded-pill">
                            ${order.price}
                        </span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-muted">No tienes órdenes pasadas</p>
                )}

                <button className="btn btn-dark w-100">
                    <i className="fas fa-sign-out-alt me-2"></i> Cerrar sesión
                </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;