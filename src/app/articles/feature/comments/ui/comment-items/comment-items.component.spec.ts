import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentItemsComponent } from './comment-items.component';

describe('CommentItemsComponent', () => {
  let component: CommentItemsComponent;
  let fixture: ComponentFixture<CommentItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
