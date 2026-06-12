import axios from "axios";

const BASE_URL = "https://carrosappbackend.onrender.com/api";

const api = axios.create({ baseURL: BASE_URL, timeout: 8000 });

export const carroService = {
  listar: () => api.get("/carros"),
  criar: (dados) => api.post("/carros", dados),
  atualizar: (id, dados) => api.put(`/carros/${id}`, dados),
  deletar: (id) => api.delete(`/carros/${id}`),
};
