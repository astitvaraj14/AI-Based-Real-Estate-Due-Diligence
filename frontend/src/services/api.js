import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

<<<<<<< HEAD
=======
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

>>>>>>> origin/develop
export default api;