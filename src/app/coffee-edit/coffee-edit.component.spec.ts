import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeEditComponent } from './coffee-edit.component';

describe('CoffeeEditComponent', () => {
  let component: CoffeeEditComponent;
  let fixture: ComponentFixture<CoffeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
