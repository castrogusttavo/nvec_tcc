import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportCssPage } from './report-css.page';

describe('ReportCssPage', () => {
  let component: ReportCssPage;
  let fixture: ComponentFixture<ReportCssPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportCssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
