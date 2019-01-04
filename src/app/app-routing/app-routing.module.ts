import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeDataListComponent } from '../coffee-data-list/coffee-data-list.component';
import { CoffeeDetailComponent } from '../coffee-detail/coffee-detail.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { WelcomeComponent } from '../welcome/welcome.component';

const appRoutes: Routes = [
  { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full' },
  { path: 'coffee-detail/:id', component: CoffeeDetailComponent, pathMatch: 'full' },
  { path: 'coffee-edit/:id', component: CoffeeEditComponent, pathMatch: 'full' },
  { path: 'coffee-edit/undefined', redirectTo: '/coffee-data-list' },
  { path: '', component: WelcomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
