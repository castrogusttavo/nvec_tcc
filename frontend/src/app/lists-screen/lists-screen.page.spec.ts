import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsScreenPage } from './lists-screen.page';

describe('ListsScreenPage', () => {
  let component: ListsScreenPage;
  let fixture: ComponentFixture<ListsScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListsScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
