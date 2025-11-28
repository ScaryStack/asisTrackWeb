import axios from "axios";

export const api = axios.create({
  baseURL: '/api', // ahora apunta al proxy de Vite
})
