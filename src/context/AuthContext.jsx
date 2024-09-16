import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [rol, setRol] = useState(localStorage.getItem('rol') ? parseInt(localStorage.getItem('rol'), 10) : 0);

  // Función para iniciar sesión
  const login = (userToken, userRefreshToken, userRol) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('refreshToken', userRefreshToken);
    localStorage.setItem('rol', userRol);
    setToken(userToken);
    setRefreshToken(userRefreshToken);
    setRol(userRol);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('rol');
    setToken(null);
    setRefreshToken(null);
    setRol(0);
  };

  // Función para renovar el token
  const refreshTokenFn = async () => {
    try {
      const response = await axios.post('http://vps-4291415-x.dattaweb.com:8080/api/auth/refresh', {
        refresh_token: refreshToken, // Si el backend usa refresh tokens
      });

      const newToken = response.data.token;
      const newRefreshToken = response.data.refreshToken || refreshToken; // Si el servidor devuelve un nuevo refresh token
      localStorage.setItem('token', newToken);
      localStorage.setItem('refreshToken', newRefreshToken); // Guarda el refresh token si es nuevo
      setToken(newToken);
      setRefreshToken(newRefreshToken);
      return newToken;
    } catch (error) {
      console.error('Error al renovar el token:', error);
      logout(); // Cerrar sesión si la renovación falla
      throw error;
    }
  };

  const value = {
    token,
    rol,
    login,
    logout,
    refreshToken: refreshTokenFn, // Cambié el nombre para evitar confusión con el estado
    hayUsuario: () => !!token,
    esCliente: () => rol === 1,
    esAdmin: () => rol === 2,
    esProfesional: () => rol === 3,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
      throw new Error('useAuth tiene que usarse con AuthProvider');
  }

  const logoutWithNavigation = () => {
      context.logout();
      navigate('/');
  };

  return {
      ...context,
      logout: logoutWithNavigation
  };
};