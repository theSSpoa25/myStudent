import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  public filterForm!: FormGroup;
  public event: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  filter() {
    this.event.emit(this.filterForm)
    this.bsModalRef.hide();
  }

  reset() {
    this.filterForm.reset();
    this.filter();
  }

  close() {
    this.bsModalRef.hide();
  }



}
