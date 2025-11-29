import { api } from "./axiosClient";
import type { VacationModel } from "../models/Vacation";

export const vacationApi = {
  getAll: () => api.get<VacationModel[]>("/vacation"),

  getById: (id: number) => api.get<VacationModel>(`/vacation/${id}`),

  create: (vacation: Partial<VacationModel>) =>
    api.post<VacationModel>("/vacation", vacation),

  delete: (id: number) => api.delete(`/vacation/${id}`),
};
