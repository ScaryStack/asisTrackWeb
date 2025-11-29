import { api } from "./axiosClient";

export interface UserModel {
  userId: number;
  email: string;
  password: string;
}

export interface PersonModel {
  idPerson: number;
  rut: string;
  name: string;
  phone: string;
  company: string;
  users: UserModel[];
}

export const personApi = {
  getById: (id: number) => api.get<PersonModel>(`/person/${id}`),

  update: (id: number, data: Partial<PersonModel>) =>
    api.put(`/person/${id}`, data),
};
