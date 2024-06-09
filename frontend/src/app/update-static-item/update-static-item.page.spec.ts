import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateStaticItemPage } from './update-static-item.page';

describe('UpdateStaticItemPage', () => {
  let component: UpdateStaticItemPage;
  let fixture: ComponentFixture<UpdateStaticItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateStaticItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
