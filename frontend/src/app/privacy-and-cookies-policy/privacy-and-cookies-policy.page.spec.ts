import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyAndCookiesPolicyPage } from './privacy-and-cookies-policy.page';

describe('PrivacyAndCookiesPolicyPage', () => {
  let component: PrivacyAndCookiesPolicyPage;
  let fixture: ComponentFixture<PrivacyAndCookiesPolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrivacyAndCookiesPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
