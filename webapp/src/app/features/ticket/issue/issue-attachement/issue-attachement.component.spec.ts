import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueAttachementComponent } from './issue-attachement.component';

describe('IssueAttachementComponent', () => {
  let component: IssueAttachementComponent;
  let fixture: ComponentFixture<IssueAttachementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueAttachementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueAttachementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
