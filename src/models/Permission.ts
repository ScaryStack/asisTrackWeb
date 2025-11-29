export interface PermissionModel {
  idPermission?: number;
  reason: string;
  date: string;   // fecha en formato ISO
  hour: string;   // hora en formato HH:mm
  request?: {
    idRequest?: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestType: "PERMISSION";
    creationDate: string;
    user: { userId: number };
  };
}
    