import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFolderComponent } from './private-folder.component';

describe('PrivateFolderComponent', () => {
  let component: PrivateFolderComponent;
  let fixture: ComponentFixture<PrivateFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
