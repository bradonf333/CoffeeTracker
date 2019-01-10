import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule,
    HttpClientModule,
    MatGridListModule,
    MatChipsModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule,
    HttpClientModule,
    MatGridListModule,
    MatChipsModule,
    MatTooltipModule
  ],
  declarations: []
})
export class AppMaterialModule {}
