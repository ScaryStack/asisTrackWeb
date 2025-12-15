import { api } from "./axiosClient";

export type User = {
  userId: number;
  email: string;
  password: string;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/user");
  return response.data;
};
