import { Owner } from "../user/owner";

export interface Comment {
  id: number;
  user: Owner;
  comment: String;
  createdAt: Date;
}
