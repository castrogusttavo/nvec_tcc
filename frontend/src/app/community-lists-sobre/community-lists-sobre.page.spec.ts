import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityListsSobrePage } from './community-lists-sobre.page';

describe('CommunityListsSobrePage', () => {
  let component: CommunityListsSobrePage;
  let fixture: ComponentFixture<CommunityListsSobrePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommunityListsSobrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
