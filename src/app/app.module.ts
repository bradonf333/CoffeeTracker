import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule
  , MatTableModule, MatInputModule, MatPaginatorModule, MatSortModule
  , MatListModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoffeeDataListComponent } from './coffee-data-list/coffee-data-list.component';
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
import { CoffeeEditConfirmationComponent } from './coffee-edit-confirmation/coffee-edit-confirmation.component';

const appRoutes: Routes = [
  { path: 'coffee-list', component: CoffeeListComponent, pathMatch: 'full' },
  { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full'},
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
    CoffeeEditConfirmationComponent
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
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatToolbarModule,
    MatSelectModule, MatInputModule, MatMenuModule, MatCardModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatListModule,
    MatSidenavModule, MatDatepickerModule, MatMomentDateModule,
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
