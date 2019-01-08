/* Angular Imports */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
/* Firestore Imports */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CoffeeDataListComponent } from './coffee-data-list/coffee-data-list.component';
import { CoffeeDeleteDialogComponent } from './coffee-delete-dialog/coffee-delete-dialog.component';
import { CoffeeDetailComponent } from './coffee-detail/coffee-detail.component';
import { CoffeeEditConfirmationComponent } from './coffee-edit-confirmation/coffee-edit-confirmation.component';
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
/* My created Component Imports */
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
  entryComponents: [CoffeeEditConfirmationComponent, CoffeeDeleteDialogComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NavBarComponent]
})
export class AppModule {}
