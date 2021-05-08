import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSpecificImageComponent } from './remove-specific-image.component';

describe('RemoveSpecificImageComponent', () => {
  let component: RemoveSpecificImageComponent;
  let fixture: ComponentFixture<RemoveSpecificImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveSpecificImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSpecificImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
