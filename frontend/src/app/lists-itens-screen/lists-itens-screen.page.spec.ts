import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsItensScreenPage } from './lists-itens-screen.page';

describe('ListsItensScreenPage', () => {
  let component: ListsItensScreenPage;
  let fixture: ComponentFixture<ListsItensScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListsItensScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
