import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatToolbarModule,
    MatSelectModule, MatInputModule, MatMenuModule, MatCardModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatListModule,
    MatSidenavModule, MatDatepickerModule, MatMomentDateModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatToolbarModule,
    MatSelectModule, MatInputModule, MatMenuModule, MatCardModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatListModule,
    MatSidenavModule, MatDatepickerModule, MatMomentDateModule
  ],
  declarations: []
})
export class AppMaterialModule { }
