import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateItemComunnityPage } from './update-item-comunnity.page';

describe('UpdateItemComunnityPage', () => {
  let component: UpdateItemComunnityPage;
  let fixture: ComponentFixture<UpdateItemComunnityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateItemComunnityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
