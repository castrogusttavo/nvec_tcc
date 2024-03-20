import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadScreen2Page } from './load-screen2.page';

describe('LoadScreen2Page', () => {
  let component: LoadScreen2Page;
  let fixture: ComponentFixture<LoadScreen2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadScreen2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
