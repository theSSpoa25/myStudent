import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Status } from 'src/app/_models/ticket/stauts';
import { StatusService } from 'src/app/_services/api/status.service';
import { TicketService } from 'src/app/_services/api/ticket.service';

@Component({
  selector: 'app-issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss']
})
export class IssueStatusComponent implements OnInit {

  @Input() status: Status;
  @Input() id: number
  menuItems: MenuItem[] = [];
  statuses: Status[];

  constructor(
    private statusService: StatusService,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.statusService.getAllStatusses().subscribe(
      res => {
        this.statuses = res.statuses;
        res.statuses.forEach(status => {
          this.menuItems.push(
            {
              label: status.statusTitle,
              command: () => {
                this.changeStatus(status.id);
              }
            })
        });
      }
    )
  }

  private changeStatus(statusId: number) {
    this.status = this.statuses.find(status => status.id === statusId);
    this.ticketService.changeStatus(this.id, this.status).subscribe(
      res => {
        this.toastr.success(`Status changed to ${this.status.statusTitle}`);
      }
    );
  }
}
