import { useState } from "react";
import api from "../../lib/api";

export default function Checkout() {
    const [cart] = useState([
        { id: 1, name: "Napolitana", qty: 2, price: 5950 },
        { id: 2, name: "Pepperoni", qty: 1, price: 6500 },
    ]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

  const total = cart.reduce((acc, i) => acc + i.qty * i.price, 0);

    const onCheckout = async () => {
        setError("");
        try {
            const { data } = await api.post("/api/checkouts", { cart });
            setResult(data);
        } catch (err) {
            setError(err?.response?.data?.message || "Error en checkout");
        }
    };

    return (
        <div className="container">
            <h2 className="h4 my-3">Checkout</h2>
            <pre>{JSON.stringify(cart, null, 2)}</pre>
            <p><strong>Total:</strong> ${total}</p>
            <button className="btn btn-dark" onClick={onCheckout}>Confirmar pago</button>

            {result && (
                <>
                    <hr />
                    <h6>Respuesta del backend</h6>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </>
            )}
            {error && <div className="alert alert-danger my-3">{error}</div>}
        </div>
    );
}