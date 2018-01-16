import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionEntryComponent } from './adoption-entry.component';

describe('AdoptionEntryComponent', () => {
  let component: AdoptionEntryComponent;
  let fixture: ComponentFixture<AdoptionEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
