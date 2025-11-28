import { vacationApi } from "../api/vacationApi";
import type { VacationModel } from "../models/Vacation";

export const VacationService = {
  async getVacations() {
    const res = await vacationApi.getAll();
    return res.data;
  },

  async getVacation(id: number) {
    const res = await vacationApi.getById(id);
    return res.data;
  },

  async createVacation(vacation: Partial<VacationModel>) {
    const res = await vacationApi.create(vacation);
    return res.data;
  },

  async deleteVacation(id: number) {
    await vacationApi.delete(id);
  },
};
