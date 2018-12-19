import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDeleteDialogComponent } from './coffee-delete-dialog.component';

describe('CoffeeDeleteComponent', () => {
  let component: CoffeeDeleteDialogComponent;
  let fixture: ComponentFixture<CoffeeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
