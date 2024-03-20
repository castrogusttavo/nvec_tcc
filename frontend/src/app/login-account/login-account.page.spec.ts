import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAccountPage } from './login-account.page';

describe('LoginAccountPage', () => {
  let component: LoginAccountPage;
  let fixture: ComponentFixture<LoginAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
