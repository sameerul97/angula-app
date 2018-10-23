import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchappComponent } from './launchapp.component';

describe('LaunchappComponent', () => {
  let component: LaunchappComponent;
  let fixture: ComponentFixture<LaunchappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
