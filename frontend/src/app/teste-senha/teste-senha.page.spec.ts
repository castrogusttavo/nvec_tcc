import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TesteSenhaPage } from './teste-senha.page';

describe('TesteSenhaPage', () => {
  let component: TesteSenhaPage;
  let fixture: ComponentFixture<TesteSenhaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TesteSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
