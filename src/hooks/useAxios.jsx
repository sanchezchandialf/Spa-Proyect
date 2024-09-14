import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useAxios = () => {
  const { token, logout } = useAuth();

  // Crear una instancia de Axios
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor de peticiones para añadir el token a todas las solicitudes
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuestas para manejar errores, como el token expirado
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Si el servidor responde con un error 401, cerramos sesión
        logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;