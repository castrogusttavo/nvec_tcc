import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllCommunityScreenPage } from './all-community-screen.page';

describe('AllCommunityScreenPage', () => {
  let component: AllCommunityScreenPage;
  let fixture: ComponentFixture<AllCommunityScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllCommunityScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
