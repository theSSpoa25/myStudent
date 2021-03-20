import { Component, Input, OnInit } from '@angular/core';
import { faComments, faPaperclip, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Ticket } from 'src/app/_models/ticket/ticket';

@Component({
  selector: 'app-issue-presentation',
  templateUrl: './issue-presentation.component.html',
  styleUrls: ['./issue-presentation.component.scss']
})
export class IssuePresentationComponent implements OnInit {

  @Input() ticket: Ticket;
  public faPaperClip = faPaperclip;
  public faComments = faComments;
  public faTrashAlt = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
