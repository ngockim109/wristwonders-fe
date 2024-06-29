import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/wristwonders",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");

      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default api;
