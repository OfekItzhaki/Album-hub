import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateModeDialogComponent } from './private-mode-dialog.component';

describe('PrivateModeDialogComponent', () => {
  let component: PrivateModeDialogComponent;
  let fixture: ComponentFixture<PrivateModeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateModeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateModeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
