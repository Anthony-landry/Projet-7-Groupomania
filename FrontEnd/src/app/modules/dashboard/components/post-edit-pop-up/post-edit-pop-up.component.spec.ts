import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditPopUpComponent } from './post-edit-pop-up.component';

describe('PostEditPopUpComponent', () => {
  let component: PostEditPopUpComponent;
  let fixture: ComponentFixture<PostEditPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEditPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
