import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeDataListComponent } from '../coffee-data-list/coffee-data-list.component';
import { CoffeeDetailComponent } from '../coffee-detail/coffee-detail.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { TestDashboardComponent } from '../test-dashboard/test-dashboard.component';
import { WelcomeComponent } from '../welcome/welcome.component';

const appRoutes: Routes = [
  { path: 'coffee-data-list', component: CoffeeDataListComponent, pathMatch: 'full' },
  { path: 'coffee-detail/:id', component: CoffeeDetailComponent, pathMatch: 'full' },
  { path: 'coffee-edit/:id', component: CoffeeEditComponent, pathMatch: 'full' },
  { path: 'coffee-edit/undefined', redirectTo: '/coffee-data-list' },
  { path: 'coffee-dashboard', component: TestDashboardComponent, pathMatch: 'full' },
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
