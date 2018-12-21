import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDetailComponent } from './coffee-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoffeeDataListComponent } from '../coffee-data-list/coffee-data-list.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { Mode } from '../CoffeeConfirmation';
import { Observable } from 'rxjs';
import { Coffee } from '../Coffee';
import { CoffeeService } from '../coffee.service';
import * as moment from 'moment';

class MockCoffeeService {
  coffees = new Observable<Coffee>();
  coffeess = [];
  coffee: Coffee = {
    description: 'test',
    date: moment().format('MM/DD/YYYY'),
    id: 'new'
  };

  getAllCoffeess() {
    return this.coffeess.push(this.coffee);
  }
}

describe('CoffeeDetailComponent', () => {
  let component: CoffeeDetailComponent;
  let fixture: ComponentFixture<CoffeeDetailComponent>;
  let service: MockCoffeeService;

  const appRoutes: Routes = [
    { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full'},
    { path: 'coffee-detail/:id', component: CoffeeDetailComponent, pathMatch: 'full'},
    { path: 'coffee-edit/:id', component: CoffeeEditComponent, pathMatch: 'full'},
    { path: 'coffee-edit/undefined', redirectTo: '/coffee-data-list'},
    { path: '', component: WelcomeComponent, pathMatch: 'full' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoffeeDataListComponent,
        CoffeeDetailComponent,
        CoffeeEditComponent,
        WelcomeComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        NoopAnimationsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    service = new MockCoffeeService();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should set coffeeConfirmationMode to Add when id is new', () => {

    component.coffeeConfirmation = {
      coffee: {
      description: 'test',
      date: '12/01/2018',
      id: '0'
    },
    mode: Mode.None
  };
    component.id = 'new';

    component.setCoffeeAndMode();

    expect(component.coffeeConfirmation.mode).toBe(Mode.Add);
  });
});
