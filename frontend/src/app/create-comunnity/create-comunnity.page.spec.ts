import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComunnityPage } from './create-comunnity.page';

describe('CreateComunnityPage', () => {
  let component: CreateComunnityPage;
  let fixture: ComponentFixture<CreateComunnityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateComunnityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
