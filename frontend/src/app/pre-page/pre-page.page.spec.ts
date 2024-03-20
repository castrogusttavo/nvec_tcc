import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrePagePage } from './pre-page.page';

describe('PrePagePage', () => {
  let component: PrePagePage;
  let fixture: ComponentFixture<PrePagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
