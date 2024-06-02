import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadScreenCommunityPage } from './load-screen-community.page';

describe('LoadScreenCommunityPage', () => {
  let component: LoadScreenCommunityPage;
  let fixture: ComponentFixture<LoadScreenCommunityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadScreenCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
