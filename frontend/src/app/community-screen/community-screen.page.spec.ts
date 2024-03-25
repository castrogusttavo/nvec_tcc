import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityScreenPage } from './community-screen.page';

describe('CommunityScreenPage', () => {
  let component: CommunityScreenPage;
  let fixture: ComponentFixture<CommunityScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommunityScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
