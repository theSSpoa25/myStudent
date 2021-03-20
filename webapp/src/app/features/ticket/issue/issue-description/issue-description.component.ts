import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCheck, faTicketAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Editor } from 'primeng/editor';
import { cloneDeep, take, toNumber } from 'lodash';
import { Ticket } from 'src/app/_models/ticket/ticket';
import { TicketService } from 'src/app/_services/api/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss']
})
export class IssueDescriptionComponent implements OnInit {

  @Input() description: string;
  @Input() id: number;
  @ViewChild(Editor, {static: false}) public editor: Editor
  public isEditing: boolean = false;
  public descriptionForm: FormGroup = this.fb.group({
    description: this.fb.control('')
  });
  public faCheck = faCheck;
  public faTimes = faTimes;
  private temp: string = '';

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setDescription(this.description)
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.temp = cloneDeep(this.descriptionValue);
    }
  }

  onEditorInit(quill) {
    quill.editor.focus();
  }

  cancel() {
    this.setDescription(this.temp);
    this.isEditing = false;
  }

  save() {
    this.ticketService.changeDescription(this.id, {description: this.descriptionValue}).pipe(
      ).subscribe(
        res => {
          if (res) {
            this.toastr.success('Description changed sucessfully');
            this.isEditing = false;
          }
        }
      )
  }

  private get descriptionValue() {
    return this.descriptionForm.get('description').value;
  }

  private setDescription(value) {
    this.descriptionForm.get('description').setValue(value);
    this.descriptionForm.get('description').patchValue(value);
  }

}
