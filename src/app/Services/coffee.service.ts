import { Injectable } from '@angular/core';

import { config } from '../app.config';
import { Coffee } from '../Models/Coffee';

import { map } from 'rxjs/operators';

import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  coffees: AngularFirestoreCollection<Coffee>;
  private coffeeDoc: AngularFirestoreDocument<Coffee>;

  constructor(private db: AngularFirestore) {
    this.coffees = db.collection<Coffee>(config.collection_endpoint);
  }

  /** Return the Coffees from the DB */
  getAllCoffees() {
    const coffees = this.db
      .collection<Coffee>(config.collection_endpoint)
      .snapshotChanges()
      .pipe(
        map(coffeeDocs =>
          coffeeDocs.map(a => {
            const data = a.payload.doc.data() as Coffee;
            const id = a.payload.doc.id;
            // console.log(a.payload);
            // console.log({id, ...data });
            return { id, ...data };
          })
        )
      );

    return coffees;
  }

  /** Return the Coffees from the DB */
  getCoffee(id: string) {
    return this.db.collection(config.collection_endpoint).doc<Coffee>(id);
  }

  /** Add the new Coffee to the collection */
  addCoffee(coffee: Coffee) {
    this.coffees
      .add({
        name: coffee.name,
        roaster: coffee.roaster,
        roastDate: coffee.roastDate,
        regions: coffee.regions,
        rating: coffee.rating,
        flavors: coffee.flavors,
        // date: coffee.date,
        notes: coffee.notes
      })
      .then(function(docRef) {
        console.log(`Document written with ID: ${docRef.id}`);
      })
      .catch(function(error) {
        console.error(`Error adding the document: ${error}`);
      });
  }

  /** Update an existing Coffee */
  updateCoffee(id: string, coffeeToUpdate: Coffee) {
    this.db
      .collection(config.collection_endpoint)
      .doc<Coffee>(id)
      .set({
        name: coffeeToUpdate.name,
        roaster: coffeeToUpdate.roaster,
        roastDate: coffeeToUpdate.roastDate,
        regions: coffeeToUpdate.regions,
        flavors: coffeeToUpdate.flavors,
        rating: coffeeToUpdate.rating,
        notes: coffeeToUpdate.notes
        // id: coffeeToUpdate.id
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  }

  /** Delete a Coffee */
  deleteCoffee(id: string) {
    // Get the Coffee Document
    this.coffeeDoc = this.getCoffee(id);

    // Delete the Coffee Document
    this.coffeeDoc.delete();
  }
}
