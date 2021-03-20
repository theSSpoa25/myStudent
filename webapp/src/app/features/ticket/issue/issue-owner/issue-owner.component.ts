import { Component, Input, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models/user/owner';

@Component({
  selector: 'app-issue-owner',
  templateUrl: './issue-owner.component.html',
  styleUrls: ['./issue-owner.component.scss']
})
export class IssueOwnerComponent implements OnInit {

  @Input() owner: Owner;

  constructor() { }

  ngOnInit(): void {
  }

}
