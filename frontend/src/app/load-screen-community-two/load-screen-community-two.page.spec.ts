import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadScreenCommunityTwoPage } from './load-screen-community-two.page';

describe('LoadScreenCommunityTwoPage', () => {
  let component: LoadScreenCommunityTwoPage;
  let fixture: ComponentFixture<LoadScreenCommunityTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadScreenCommunityTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
