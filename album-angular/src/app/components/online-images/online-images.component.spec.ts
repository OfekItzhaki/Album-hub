import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineImagesComponent } from './online-images.component';

describe('OnlineImagesComponent', () => {
  let component: OnlineImagesComponent;
  let fixture: ComponentFixture<OnlineImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
