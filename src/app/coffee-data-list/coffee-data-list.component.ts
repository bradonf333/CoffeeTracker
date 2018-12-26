import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { CoffeeDataListDataSource } from './coffee-data-list-datasource';
import { CoffeeService } from '../coffee.service';
import { CoffeeDeleteDialogComponent } from '../coffee-delete-dialog/coffee-delete-dialog.component';

@Component({
  selector: 'app-coffee-data-list',
  templateUrl: './coffee-data-list.component.html',
  styleUrls: ['./coffee-data-list.component.scss'],
})
export class CoffeeDataListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CoffeeDataListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['#', 'description', 'date', 'options'];

  constructor(private coffeeService: CoffeeService, public dialog: MatDialog, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.dataSource = new CoffeeDataListDataSource(this.coffeeService);
  }

  confirmDelete(coffeeId: string): void {

    if ( coffeeId ) {
      const dialogRef = this.dialog.open(CoffeeDeleteDialogComponent, {
        width: '80%',
        maxWidth: '450px',
        data: {
          coffeeId: coffeeId
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
    } else {
      this.snackBar.open('Sorry this is not a valid Coffee obejct.', 'Dismiss', {duration: 2000});
    }
  }

  sorter(header: string) {
    console.log(`Clicked ${header}`);
  }
}
