import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateItemComunnityPage } from './create-item-comunnity.page';

describe('CreateItemComunnityPage', () => {
  let component: CreateItemComunnityPage;
  let fixture: ComponentFixture<CreateItemComunnityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateItemComunnityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
