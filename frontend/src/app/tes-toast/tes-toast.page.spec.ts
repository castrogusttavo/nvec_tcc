import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TesToastPage } from './tes-toast.page';

describe('TesToastPage', () => {
  let component: TesToastPage;
  let fixture: ComponentFixture<TesToastPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TesToastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
