export type RequestType = "PERMISSION" | "VACATION";
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface PermissionModel {
  idRequest: number;
  reason: string;
  startDate: string;
  startTime: string;
}

export interface VacationModel {
  idRequest: number;
  idVacation: number;
  daysAvailable: number;
  dateStart: string;
  dateFinish: string;
}

export interface RequestModel {
  idRequest: number;
  status: RequestStatus;
  requestType: RequestType;
  creationDate: string;
  user: { userId: number };
  permission?: PermissionModel | null;
  vacation?: VacationModel | null;
}
