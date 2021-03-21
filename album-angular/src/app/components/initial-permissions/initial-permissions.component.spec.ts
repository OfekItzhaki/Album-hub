import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPermissionsComponent } from './initial-permissions.component';

describe('InitialPermissionsComponent', () => {
  let component: InitialPermissionsComponent;
  let fixture: ComponentFixture<InitialPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
