import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { MatSort, MatTableDataSource } from '@angular/material';

import { Coffee } from '../app.model';
import { config } from '../app.config';
import { CoffeeService } from '../coffee.service';
import * as _ from 'underscore';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent implements OnInit {

  coffeeCollection: AngularFirestoreCollection<Coffee>;
  coffeesObservable: Observable<Coffee[]>;
  coffeeDoc: AngularFirestoreDocument<Coffee>;
  coffees: Observable<Coffee[]>;
  coffeeDesc: string;
  coffeeDate: string;
  editMode = false;
  coffeeToEdit: any = {};

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private db: AngularFirestore, private coffeeService: CoffeeService) { }

  ngOnInit() {

    // Initialize the list of Coffees
    this.coffeeCollection = this.db.collection(config.collection_endpoint);

    this.coffees = this.coffeeCollection.snapshotChanges()
    .pipe(map(coffees => coffees.map(a => {
      const data = a.payload.doc.data() as Coffee;
      const id = a.payload.doc.id;
      console.log(a.payload);
      console.log({id, ...data });
      return { id, ...data };
    })));
  }

  editCoffee(coffee) {
    console.log(coffee);

    // Set form value
    coffee.description = this.coffeeDesc;
    coffee.date = this.coffeeDate;

    const coffeeId = this.coffeeToEdit.id;
    this.coffeeService.updateCoffee(coffeeId, this.coffeeToEdit);
  }

  addCoffee() {

    const newCoffee: Coffee = {
      description: this.coffeeDesc,
      date: this.coffeeDate
    };

    this.coffeeService.addCoffee(newCoffee);
  }

  deleteCoffee(coffee) {

    const coffeeId = coffee.id;
    this.coffeeService.deleteCoffee(coffeeId);
  }

}
