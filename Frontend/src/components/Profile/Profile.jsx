import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useUser } from "../../context/UserContext";

const Profile = () => {
    const { email, name, fetchProfile, logout } = useUser();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchProfile();
            setProfile(data);
        } catch {
            setError("No se pudo cargar el perfil");
        }
        })();
    }, [fetchProfile]);

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

        <div className="card shadow-sm mx-auto profile-card" style={{ maxWidth: "500px" }}>
            <div className="card-body text-center">
            <img
                src="https://picsum.photos/100"
                alt="Foto de perfil"
                className="rounded-circle mb-3 profile-img"
            />

            <p className="fw-bold mb-1">Nombre</p>
            <p className="text-muted mb-2">{name || profile?.name || "-"}</p>
            
            {error && <div className="alert alert-danger">{error}</div>}

            {profile && (
                <>
                    <hr />
                    <h6 className="fw-bold mb-2">Datos del perfil</h6>
                    <ul className="list-group list-group-flush text-start mb-3">
                        <li className="list-group-item">
                        <strong>Email:</strong> {profile.email}
                        </li>
                    </ul>
                </>
            )}
            <hr />
            <h5 className="fw-bold mb-3">Órdenes pasadas</h5>
            {pastOrders.length > 0 ? (
                <ul className="list-group mb-4 text-start">
                {pastOrders.map((order) => (
                    <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p className="mb-1 fw-bold">{order.name}</p>
                        <small className="text-muted">Fecha: {order.date}</small>
                    </div>
                    <span className="badge bg-dark rounded-pill">${order.price}</span>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-muted">No tienes órdenes pasadas</p>
            )}

            <button className="btn btn-dark w-100" onClick={logout}>
                <i className="fas fa-sign-out-alt me-2"></i> Cerrar sesión
            </button>
            </div>
        </div>
        </div>
    );
};

export default Profile;