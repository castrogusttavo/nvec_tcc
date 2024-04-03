import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TesteModalPage } from './teste-modal.page';

describe('TesteModalPage', () => {
  let component: TesteModalPage;
  let fixture: ComponentFixture<TesteModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TesteModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
