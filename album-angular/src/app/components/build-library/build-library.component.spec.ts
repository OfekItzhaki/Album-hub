import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildLibraryComponent } from './build-library.component';

describe('BuildLibraryComponent', () => {
  let component: BuildLibraryComponent;
  let fixture: ComponentFixture<BuildLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
