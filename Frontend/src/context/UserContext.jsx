import { createContext, useContext, useState, useCallback } from "react";
import api from "../lib/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [email, setEmail] = useState(localStorage.getItem("email") || null);
    const [loading, setLoading] = useState(false);

    const saveAuth = ({ token, email }) => {
        setToken(token);
        setEmail(email);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    };

    const clearAuth = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    };

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const { data } = await api.post("/api/auth/login", { email, password });
            saveAuth({ token: data.token, email: data.email });
            return data;
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ email, password }) => {
        setLoading(true);
        try {
            const { data } = await api.post("/api/auth/register", { email, password });
            saveAuth({ token: data.token, email: data.email });
            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        clearAuth();
    };

    const fetchProfile = useCallback(async () => {
        const { data } = await api.get("/api/auth/me");
        if (data?.email && data.email !== email) {
            setEmail(data.email);
            localStorage.setItem("email", data.email);
        }
            return data;
    }, [email]);

    return (
        <UserContext.Provider
            value={{ token, email, loading, login, register, logout, fetchProfile }}
            >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);