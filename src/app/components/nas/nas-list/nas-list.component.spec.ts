import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasListComponent } from './nas-list.component';

describe('NasListComponent', () => {
  let component: NasListComponent;
  let fixture: ComponentFixture<NasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
