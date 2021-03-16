import { Type } from "./type";

export class CreateTicket {

  private title: string;
  private type: Type;
  private summary: string;
  private assigneeId: number;
  private ownerId: number;
  private dueDate: Date;

  constructor(createTicketForm) {
    this.title = createTicketForm.title;
    this.type = createTicketForm.type;
    this.summary = createTicketForm.description;
    this.assigneeId = createTicketForm.assignee.id;
    this.ownerId = createTicketForm.ownerId;
    this.dueDate = createTicketForm.dueDate;
  }
}


