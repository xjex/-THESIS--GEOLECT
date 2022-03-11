import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPassPage } from './f-pass.page';

describe('FPassPage', () => {
  let component: FPassPage;
  let fixture: ComponentFixture<FPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
