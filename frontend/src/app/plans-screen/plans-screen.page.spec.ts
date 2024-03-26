import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlansScreenPage } from './plans-screen.page';

describe('PlansScreenPage', () => {
  let component: PlansScreenPage;
  let fixture: ComponentFixture<PlansScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlansScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
