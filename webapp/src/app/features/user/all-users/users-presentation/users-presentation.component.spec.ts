import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPresentationComponent } from './users-presentation.component';

describe('UsersPresentationComponent', () => {
  let component: UsersPresentationComponent;
  let fixture: ComponentFixture<UsersPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
