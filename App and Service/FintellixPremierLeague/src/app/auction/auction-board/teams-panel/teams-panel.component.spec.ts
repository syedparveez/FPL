import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsPanelComponent } from './teams-panel.component';

describe('TeamsPanelComponent', () => {
  let component: TeamsPanelComponent;
  let fixture: ComponentFixture<TeamsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
