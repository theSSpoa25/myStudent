export interface StatusResponse {
  statuses: Status[] | any[];
}

export interface Status {
  id: number;
  statusTitle: string;
}

