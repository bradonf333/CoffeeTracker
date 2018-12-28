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
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('CoffeeDetailComponent', () => {
  let component: CoffeeDetailComponent;
  let fixture: ComponentFixture<CoffeeDetailComponent>;

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
        NoopAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
