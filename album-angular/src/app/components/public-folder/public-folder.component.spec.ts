import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFolderComponent } from './public-folder.component';

describe('PublicFolderComponent', () => {
  let component: PublicFolderComponent;
  let fixture: ComponentFixture<PublicFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
