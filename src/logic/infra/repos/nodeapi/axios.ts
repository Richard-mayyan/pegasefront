import axios from "axios";
import { APP_ENVS } from "../../config/envs";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";

const createAxios = () => {
  const instance = axios.create({
    baseURL: APP_ENVS.API_URL,
    // Ne pas définir de Content-Type par défaut pour permettre l'upload de fichiers
  });

  // Intercepteur pour ajouter le token à chaque requête
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Ajouter Content-Type application/json seulement si ce n'est pas un FormData
      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createAxios();
