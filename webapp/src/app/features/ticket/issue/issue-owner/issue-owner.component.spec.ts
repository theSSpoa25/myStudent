import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueOwnerComponent } from './issue-owner.component';

describe('IssueOwnerComponent', () => {
  let component: IssueOwnerComponent;
  let fixture: ComponentFixture<IssueOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
