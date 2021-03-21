import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateIndicationComponent } from './private-indication.component';

describe('PrivateIndicationComponent', () => {
  let component: PrivateIndicationComponent;
  let fixture: ComponentFixture<PrivateIndicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateIndicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
