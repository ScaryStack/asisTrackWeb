// src/api/permissionApi.ts
import { api } from "./axiosClient"; // reutilizando el cliente axios configurado
import type { PermissionModel } from "@models/Permission";

export const permissionApi = {
  getAll: () => api.get<PermissionModel[]>("/permission"),

  getById: (id: number) => api.get<PermissionModel>(`/permission/${id}`),

  create: (permission: Partial<PermissionModel>) =>
    api.post<PermissionModel>("/permission", permission),

  delete: (id: number) => api.delete(`/permission/${id}`),
};
