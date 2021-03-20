import { Owner } from "../user/owner";
import { Status } from "./stauts";
import { Type } from "./type";

export interface Ticket {
  id: number;
  type: Type;
  description: string;
  dueDate: Date | string;
  title: string;
  status: Status;
  owner: Owner;
  assignedTo: Owner;
  createdAt: Date;
  updatedAt: Date;

}
