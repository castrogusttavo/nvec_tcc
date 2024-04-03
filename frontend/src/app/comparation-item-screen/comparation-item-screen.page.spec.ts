import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparationItemScreenPage } from './comparation-item-screen.page';

describe('ComparationItemScreenPage', () => {
  let component: ComparationItemScreenPage;
  let fixture: ComponentFixture<ComparationItemScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComparationItemScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
