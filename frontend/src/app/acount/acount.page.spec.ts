import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcountPage } from './acount.page';

describe('AcountPage', () => {
  let component: AcountPage;
  let fixture: ComponentFixture<AcountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
