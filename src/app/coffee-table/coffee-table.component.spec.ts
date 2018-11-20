import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeTableComponent } from './coffee-table.component';

describe('CoffeeTableComponent', () => {
  let component: CoffeeTableComponent;
  let fixture: ComponentFixture<CoffeeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
