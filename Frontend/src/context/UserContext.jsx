import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(true); // token inicial en true

    const logout = () => setToken(false); // método para cerrar sesión

    return (
        <UserContext.Provider value={{ token, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);