import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Coffee } from '../app.model';
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
  coffeeDate: string;
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
