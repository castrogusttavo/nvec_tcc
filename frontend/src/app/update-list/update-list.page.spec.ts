import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateListPage } from './update-list.page';

describe('UpdateListPage', () => {
  let component: UpdateListPage;
  let fixture: ComponentFixture<UpdateListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
