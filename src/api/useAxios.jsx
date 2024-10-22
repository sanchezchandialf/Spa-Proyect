import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../context/LoginContext';

const useAxios = (options = {}) => {
  const { token, logout } = useAuth();
  const { handleLoginClick } = useLogin();
  const { ignoreAuthError = false } = options;

  const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'https://calm-perception-production.up.railway.app',
    /* baseURL: 'https://agile-flexibility-production.up.railway.app', */
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) { 
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log('Token no encontrado. No se puede realizar la solicitud.');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        if (ignoreAuthError) {
          // Si ignoreAuthError es true, no cerramos la sesión y permitimos que el componente maneje el error
          return Promise.reject(error);
        } else {
          toast.error('Su sesión expiró, inicie sesión nuevamente');
          logout();
          handleLoginClick();
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
