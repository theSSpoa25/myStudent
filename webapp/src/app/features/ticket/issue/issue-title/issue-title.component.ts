import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { Toast, ToastrService } from 'ngx-toastr';
import { Type } from 'src/app/_models/ticket/type';
import { TicketService } from 'src/app/_services/api/ticket.service';

@Component({
  selector: 'app-issue-title',
  templateUrl: './issue-title.component.html',
  styleUrls: ['./issue-title.component.scss']
})
export class IssueTitleComponent implements OnInit {

  @Input() title: string;
  @Input() id: number;
  @Input() type: Type;
  public titleForm: FormGroup = this.fb.group({
    title: this.fb.control('')
  })
  public isEditing: boolean = false;
  public faTicketAlt = faTicketAlt;
  temp: string = '';

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setTitle(this.title);
  }

  private setTitle(value) {
    this.titleForm.get('title').setValue(value);
    this.titleForm.get('title').patchValue(value);
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.temp = this.titleForm.get('title').value
    }
  }

  onBlur(): void {
    this.isEditing = false;
    if (this.titleForm.get('title').value.length > 0) {
      this.ticketService.changeTitle(this.id, this.titleForm.get('title').value).subscribe(
        res => {
          this.toastr.success('Title was sucessfully changed');
        }
      )
    } else {
      this.setTitle(this.temp);
    }
  }

}
