import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CoffeeDataListDataSource } from './coffee-data-list-datasource';
import { CoffeeService } from '../Services/coffee.service';
import { CoffeeDeleteDialogComponent } from '../coffee-delete-dialog/coffee-delete-dialog.component';

import { CoffeeDataListComponent } from './coffee-data-list.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeDetailComponent } from '../coffee-detail/coffee-detail.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AppComponent } from '../app.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

describe('CoffeeDataListComponent', () => {
  let component: CoffeeDataListComponent;
  let fixture: ComponentFixture<CoffeeDataListComponent>;

  const appRoutes: Routes = [
    { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full' },
    { path: 'coffee-detail/:id', component: CoffeeDetailComponent, pathMatch: 'full' },
    { path: 'coffee-edit/:id', component: CoffeeEditComponent, pathMatch: 'full' },
    { path: 'coffee-edit/undefined', redirectTo: '/coffee-data-list' },
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
        NoopAnimationsModule,
        AppMaterialModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence()
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
