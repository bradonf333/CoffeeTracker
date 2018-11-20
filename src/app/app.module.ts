import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoffeeDataListComponent } from './coffee-data-list/coffee-data-list.component';

const appRoutes: Routes = [
  { path: 'coffee-list', component: CoffeeListComponent, pathMatch: 'full' },
  { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full'},
  { path: '', component: WelcomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CoffeeListComponent,
    WelcomeComponent,
    CoffeeDataListComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatToolbarModule,
    MatSelectModule, MatInputModule, MatMenuModule, MatCardModule, MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  exports: [ NavBarComponent, CoffeeListComponent ]
})
export class AppModule { }
