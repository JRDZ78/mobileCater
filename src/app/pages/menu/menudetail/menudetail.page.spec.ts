import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudetailPage } from './menudetail.page';

describe('MenudetailPage', () => {
  let component: MenudetailPage;
  let fixture: ComponentFixture<MenudetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenudetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenudetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
