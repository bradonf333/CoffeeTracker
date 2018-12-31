import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeDataListComponent } from '../coffee-data-list/coffee-data-list.component';
import { CoffeeDetailComponent } from '../coffee-detail/coffee-detail.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { AppComponent } from '../app.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_BASE_HREF } from '@angular/common';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
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
        AppComponent,
        WelcomeComponent,
        CoffeeDataListComponent,
        CoffeeDetailComponent,
        CoffeeEditComponent,
        NavBarComponent
      ],
      imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        BrowserAnimationsModule,
        AppMaterialModule,
        FlexLayoutModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 'CoffeeTracker' as title`, () => {
    expect(component.title).toEqual('CoffeeTracker');
  });
});
