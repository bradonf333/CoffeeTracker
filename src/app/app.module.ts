/* Angular Imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

/* Firestore Imports */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

/* My created Component Imports */
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoffeeDataListComponent } from './coffee-data-list/coffee-data-list.component';
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
import { CoffeeEditConfirmationComponent } from './coffee-edit-confirmation/coffee-edit-confirmation.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CoffeeDetailComponent } from './coffee-detail/coffee-detail.component';
import { CoffeeDeleteDialogComponent } from './coffee-delete-dialog/coffee-delete-dialog.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    CoffeeDataListComponent,
    CoffeeEditComponent,
    CoffeeEditConfirmationComponent,
    CoffeeDetailComponent,
    CoffeeDeleteDialogComponent,
    WeatherDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  entryComponents: [
    CoffeeEditConfirmationComponent, CoffeeDeleteDialogComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  exports: [ NavBarComponent ]
})
export class AppModule { }
