import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAdmCommunityPage } from './list-adm-community.page';

describe('ListAdmCommunityPage', () => {
  let component: ListAdmCommunityPage;
  let fixture: ComponentFixture<ListAdmCommunityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListAdmCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
