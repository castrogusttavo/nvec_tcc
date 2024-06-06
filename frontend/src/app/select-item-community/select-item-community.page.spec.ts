import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectItemCommunityPage } from './select-item-community.page';

describe('SelectItemCommunityPage', () => {
  let component: SelectItemCommunityPage;
  let fixture: ComponentFixture<SelectItemCommunityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectItemCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
