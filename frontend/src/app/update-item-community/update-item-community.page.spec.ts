import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateItemCommunityPage } from './update-item-community.page';

describe('UpdateItemCommunityPage', () => {
  let component: UpdateItemCommunityPage;
  let fixture: ComponentFixture<UpdateItemCommunityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateItemCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
