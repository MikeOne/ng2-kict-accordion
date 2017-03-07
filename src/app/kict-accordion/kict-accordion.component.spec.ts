import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KictAccordionComponent } from './kict-accordion.component';

describe('KictAccordionComponent', () => {
  let component: KictAccordionComponent;
  let fixture: ComponentFixture<KictAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KictAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KictAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
