import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule
  , MatTableModule, MatInputModule, MatPaginatorModule, MatSortModule
  , MatListModule, MatSnackBarModule
} from '@angular/material';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatToolbarModule,
    MatSelectModule, MatInputModule, MatMenuModule, MatCardModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatListModule,
    MatSidenavModule, MatDatepickerModule, MatMomentDateModule, MatSnackBarModule, HttpClientModule,
    MatGridListModule, MatChipsModule, MatTooltipModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatToolbarModule,
    MatSelectModule, MatInputModule, MatMenuModule, MatCardModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatListModule,
    MatSidenavModule, MatDatepickerModule, MatMomentDateModule, MatSnackBarModule, HttpClientModule,
    MatGridListModule, MatChipsModule, MatTooltipModule
  ],
  declarations: []
})
export class AppMaterialModule { }
