import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDeleteComponent } from './coffee-delete.component';

describe('CoffeeDeleteComponent', () => {
  let component: CoffeeDeleteComponent;
  let fixture: ComponentFixture<CoffeeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
