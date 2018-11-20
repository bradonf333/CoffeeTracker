import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CoffeeDataListDataSource } from './coffee-data-list-datasource';

@Component({
  selector: 'app-coffee-data-list',
  templateUrl: './coffee-data-list.component.html',
  styleUrls: ['./coffee-data-list.component.css'],
})
export class CoffeeDataListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CoffeeDataListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new CoffeeDataListDataSource(this.paginator, this.sort);
  }
}
