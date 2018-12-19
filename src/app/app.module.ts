/* Angular Imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

/* Firestore Imports */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

/* My created Component Imports */
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoffeeDataListComponent } from './coffee-data-list/coffee-data-list.component';
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
import { CoffeeEditConfirmationComponent } from './coffee-edit-confirmation/coffee-edit-confirmation.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CoffeeDetailComponent } from './coffee-detail/coffee-detail.component';

const appRoutes: Routes = [
  { path: 'coffee-list', component: CoffeeListComponent, pathMatch: 'full' },
  { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full'},
  { path: 'coffee-detail/:id', component: CoffeeDetailComponent, pathMatch: 'full'},
  { path: 'coffee-edit/:id', component: CoffeeEditComponent, pathMatch: 'full'},
  { path: 'coffee-edit/undefined', redirectTo: '/coffee-data-list'},
  { path: '', component: WelcomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CoffeeListComponent,
    WelcomeComponent,
    CoffeeDataListComponent,
    CoffeeEditComponent,
    CoffeeEditConfirmationComponent,
    CoffeeDetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    CoffeeEditConfirmationComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  exports: [ NavBarComponent, CoffeeListComponent ]
})
export class AppModule { }
