export interface UserData {
  userId: number;
}

export interface RequestModel {
  idRequest: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestType: "VACATION" | "PERMISSION";
  creationDate: string;
  user: UserData;
}

export interface VacationModel {
  daysAvailable: number;
  dateStart: string;
  dateFinish: string;
  request: RequestModel;
}
