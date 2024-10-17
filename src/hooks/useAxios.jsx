import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../context/LoginContext';

const useAxios = () => {
  const { token,  logout } = useAuth();
  const {handleLoginClick}=useLogin();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
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
        toast.error('Su sesion expiro, inicie secion nuevamente');
        logout();
        handleLoginClick();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};



export default useAxios;
