import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDataComponent } from './library-data.component';

describe('LibraryDataComponent', () => {
  let component: LibraryDataComponent;
  let fixture: ComponentFixture<LibraryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
