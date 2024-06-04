import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBannerComponent } from './author-banner.component';

describe('AuthorBannerComponent', () => {
  let component: AuthorBannerComponent;
  let fixture: ComponentFixture<AuthorBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
