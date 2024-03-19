import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadScreen1Page } from './load-screen1.page';

describe('LoadScreen1Page', () => {
  let component: LoadScreen1Page;
  let fixture: ComponentFixture<LoadScreen1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadScreen1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
