import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo1ListComponent } from './demo1-list.component';

describe('Demo1ListComponent', () => {
  let component: Demo1ListComponent;
  let fixture: ComponentFixture<Demo1ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo1ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
