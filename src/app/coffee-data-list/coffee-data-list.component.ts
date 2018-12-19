import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CoffeeDataListDataSource } from './coffee-data-list-datasource';
import { CoffeeService } from '../coffee.service';

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
  displayedColumns = ['id', 'description', 'date', 'options'];

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit() {
    this.dataSource = new CoffeeDataListDataSource(this.coffeeService);
  }
}
