import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeEditComponent } from './coffee-edit.component';
import { CoffeeDataListComponent } from '../coffee-data-list/coffee-data-list.component';
import { CoffeeDetailComponent } from '../coffee-detail/coffee-detail.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { APP_BASE_HREF } from '@angular/common';
import { Routes } from '@angular/router';

describe('CoffeeEditComponent', () => {
  let component: CoffeeEditComponent;
  let fixture: ComponentFixture<CoffeeEditComponent>;
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
    fixture = TestBed.createComponent(CoffeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
