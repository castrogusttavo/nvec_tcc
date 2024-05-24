import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateComunnityPage } from './update-comunnity.page';

describe('UpdateComunnityPage', () => {
  let component: UpdateComunnityPage;
  let fixture: ComponentFixture<UpdateComunnityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateComunnityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
