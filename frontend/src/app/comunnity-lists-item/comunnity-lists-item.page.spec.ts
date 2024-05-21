import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComunnityListsItemPage } from './comunnity-lists-item.page';

describe('ComunnityListsItemPage', () => {
  let component: ComunnityListsItemPage;
  let fixture: ComponentFixture<ComunnityListsItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComunnityListsItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
