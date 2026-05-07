import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial check on load
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logout();
        } else {
          setUser(JSON.parse(storedUser));
          setRole(decoded.role || JSON.parse(storedUser).role);
          setIsAuthenticated(true);
        }
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const userData = {
        email: decoded.sub,
        role: decoded.role || 'CUSTOMER',
        // In a real app, you might get more info or fetch profile
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      setUser(userData);
      setRole(userData.role);
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Login failed during token decoding", e);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};