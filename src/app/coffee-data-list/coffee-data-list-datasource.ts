import { CoffeeService } from './../coffee.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Coffee, Coffee2 } from '../Coffee';

/**
 * Data source for the CoffeeDataList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CoffeeDataListDataSource extends DataSource<Coffee2> {
  data: Coffee2[] = [];

  constructor(private coffeeService: CoffeeService) {
    super();
  }

  // TODO: Dont really think this is correct but it kind of works
  // data2 = this.coffeeService.getAllCoffees().subscribe(
  //   coffees => {
  //     this.data = coffees as CoffeeDataListItem[];
  //   }
  // );
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Coffee2[]> {

    return this.coffeeService.getAllCoffees();
    // this.coffeeService.getAllCoffees().subscribe((coffees) => {
    //   this.data = coffees as CoffeeDataListItem[];
    //   console.log('Here are your coffees:', coffees);
    // });

    // TODO: Commented all the Pagination and Sorting out
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //   observableOf(this.data),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];

    // Set the paginator's length
    // this.paginator.length = this.data.length;
    // this.data2.subscribe(data => (this.paginator.length = data.length));
    // this.paginator.length = this.data2.unsubscribe.length;

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: CoffeeDataListItem[]) {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   return data.splice(startIndex, this.paginator.pageSize);
  // }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getSortedData(data: CoffeeDataListItem[]) {
  //   if (!this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }

  //   return data.sort((a, b) => {
  //     const isAsc = this.sort.direction === 'asc';
  //     switch (this.sort.active) {
  //       case 'description': return compare(a.description, b.description, isAsc);
  //       case 'id': return compare(+a.id, +b.id, isAsc);
  //       case 'date': return compare(a.date, b.date, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a, b, isAsc) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
