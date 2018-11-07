import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Coffee } from './app.model';
import { config } from './app.config';
import { CoffeeService } from './coffee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CoffeeTracker';
  coffeeCollection: AngularFirestoreCollection<Coffee>;
  coffeeDoc: AngularFirestoreDocument<Coffee>;
  coffees: Observable<Coffee[]>;
  coffeeDesc: string;
  coffeeDate: string;
  editMode = false;
  coffeeToEdit: any = {};

  constructor(private db: AngularFirestore, private coffeeService: CoffeeService) {}

  ngOnInit() {

    // Initialize the list of Coffees
    this.coffeeCollection = this.db.collection(config.collection_endpoint);

    this.coffees = this.coffeeCollection.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Coffee;
      const id = a.payload.doc.id;
      console.log(a.payload);
      console.log({id, ...data });
      return { id, ...data };
    })));
  }

  editCoffee(coffee) {
    console.log(coffee);

    // Set coffeeToEdit and editMode
    this.coffeeToEdit = coffee;
    this.editMode = true;

    // Set form value
    coffee.description = this.coffeeDesc;
    coffee.date = this.coffeeDate;

    const coffeeId = this.coffeeToEdit.id;
    this.coffeeService.updateCoffee(coffeeId, this.coffeeToEdit);
  }
}
