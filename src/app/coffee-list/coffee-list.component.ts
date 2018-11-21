import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Coffee } from '../ICoffee';
import { config } from '../app.config';
import { CoffeeService } from '../coffee.service';
import * as _ from 'underscore';

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
  coffeeDate: Date;
  editMode = false;
  coffeeToEdit: any = {};

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

  /** Edit Coffee */
  editCoffee(coffee) {
    console.log(coffee);

    // Set coffeeToEdit and editMode
    this.coffeeToEdit = coffee;
    this.editMode = true;

    // Set form value
    coffee.description = this.coffeeDesc;
    coffee.date = this.coffeeDate;

    const coffeeId = this.coffeeToEdit.id;
    console.log(coffeeId);
    this.coffeeService.updateCoffee(coffeeId, this.coffeeToEdit);
  }

  /** Add a new Coffee */
  addCoffee() {

    const newCoffee: Coffee = {
      description: this.coffeeDesc,
      date: this.coffeeDate
    };

    this.coffeeService.addCoffee(newCoffee);
  }

  /** Delete a Coffee */
  deleteCoffee(coffee) {

    const coffeeId = coffee.id;
    console.log(coffeeId);
    this.coffeeService.deleteCoffee(coffeeId);
  }

}
