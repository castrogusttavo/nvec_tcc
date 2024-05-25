import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateItemUserPage } from './update-item-user.page';

describe('UpdateItemUserPage', () => {
  let component: UpdateItemUserPage;
  let fixture: ComponentFixture<UpdateItemUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateItemUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
