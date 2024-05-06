import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegulamentationPage } from './regulamentation.page';

describe('RegulamentationPage', () => {
  let component: RegulamentationPage;
  let fixture: ComponentFixture<RegulamentationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegulamentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
