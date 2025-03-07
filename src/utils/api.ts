import axios from "axios";
import { getApiAuth } from "./auth";

const api = axios.create({
  baseURL: process.env.MARVEL_API_URL,
});

api.interceptors.request.use((r) => {
  r.params = { ...r.params, ...getApiAuth() };
  return r;
});

export default api;
