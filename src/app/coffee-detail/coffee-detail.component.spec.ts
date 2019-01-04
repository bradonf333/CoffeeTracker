import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CoffeeDetailComponent } from './coffee-detail.component';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoffeeDataListComponent } from '../coffee-data-list/coffee-data-list.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { convertToParamMap, ParamMap, Params } from '@angular/router';
export { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';

let activatedRoute: ActivatedRouteStub;
let component: CoffeeDetailComponent;
let fixture: ComponentFixture<CoffeeDetailComponent>;

export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }
}

describe('CoffeeDetailComponent', () => {
  const appRoutes: Routes = [
    { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full' },
    { path: 'coffee-detail/:id', component: CoffeeDetailComponent, pathMatch: 'full' },
    { path: 'coffee-edit/:id', component: CoffeeEditComponent, pathMatch: 'full' },
    { path: 'coffee-edit/undefined', redirectTo: '/coffee-data-list' },
    { path: '', component: WelcomeComponent, pathMatch: 'full' }
  ];

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        CoffeeDataListComponent,
        CoffeeDetailComponent,
        CoffeeEditComponent,
        WelcomeComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        NoopAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence()
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoffeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});

////////////////////////////////////////////////////////////////

describe('when navigate to existing coffee', () => {
  beforeEach(async(() => {
    // activatedRoute.setParamMap({ id: 123456});
    activatedRoute.setParamMap({ paramMap: 123 });
    createComponent();
  }));

  it("should display that coffee's name", () => {});
});

/** Create the CoffeeDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(CoffeeDetailComponent);
  component = fixture.componentInstance;

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
  });
}
