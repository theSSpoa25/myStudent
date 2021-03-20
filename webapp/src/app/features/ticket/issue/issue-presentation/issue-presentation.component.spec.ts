import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePresentationComponent } from './issue-presentation.component';

describe('IssuePresentationComponent', () => {
  let component: IssuePresentationComponent;
  let fixture: ComponentFixture<IssuePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuePresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
