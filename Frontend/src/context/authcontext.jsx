import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3002/api/login", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.data);
            } else {
                throw new Error(data.message || "Login failed");
            }

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await fetch("http://localhost:3002/api/register", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            console.log("Backend response (register):", data);

            if (response.ok) {
                setUser(data.data);
            } else {
                throw new Error(data.message || "Register failed");
            }

        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch("http://localhost:3002/api/logout", {
                method: "POST",
                credentials: "include",
            });

            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await fetch("http://localhost:3002/api/profile", {
                    method: "GET",
                    credentials: "include"
                });

                const data = await res.json();

                if (res.ok) {
                    setUser(data.data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false); 
            }
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
