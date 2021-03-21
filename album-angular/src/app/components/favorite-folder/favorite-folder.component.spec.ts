import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFolderComponent } from './favorite-folder.component';

describe('FavoriteFolderComponent', () => {
  let component: FavoriteFolderComponent;
  let fixture: ComponentFixture<FavoriteFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
