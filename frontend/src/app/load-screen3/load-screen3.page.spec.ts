import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadScreen3Page } from './load-screen3.page';

describe('LoadScreen3Page', () => {
  let component: LoadScreen3Page;
  let fixture: ComponentFixture<LoadScreen3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadScreen3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
