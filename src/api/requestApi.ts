import { api } from "./axiosClient";
import type { RequestModel } from "../models/Request";

const requestApi = {
  getAll: () => api.get<RequestModel[]>("/request"),
  create: (solicitud: Partial<RequestModel>) =>
    api.post<RequestModel>("/request", solicitud),
};

export default requestApi;
