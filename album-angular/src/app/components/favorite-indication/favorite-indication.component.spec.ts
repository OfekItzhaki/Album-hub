import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteIndicationComponent } from './favorite-indication.component';

describe('FavoriteIndicationComponent', () => {
  let component: FavoriteIndicationComponent;
  let fixture: ComponentFixture<FavoriteIndicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteIndicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
