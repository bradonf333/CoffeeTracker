import { Injectable } from '@angular/core';

import { config } from './app.config';
import { Coffee } from './Coffee';

import 'rxjs/add/operator/toPromise';
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
     const coffees = this.db.collection<Coffee>(config.collection_endpoint).valueChanges();
     console.log('Coffees: ', coffees);
     return coffees;
   }

   /** Return the Coffees from the DB */
   getCoffee(id) {
     return this.db.collection(config.collection_endpoint).doc<Coffee>(id);
  }

   /** Add the new Coffee to the collection */
   addCoffee(coffee: Coffee) {
     this.coffees.add({
       description: coffee.description,
       date: coffee.date
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

    this.db.collection(config.collection_endpoint).doc<Coffee>(id).set({
      description: coffeeToUpdate.description,
      date: coffeeToUpdate.date,
      id: coffeeToUpdate.id
  })
  .then(function() {
      console.log('Document successfully written!');
  })
  .catch(function(error) {
      console.error('Error writing document: ', error);
  });

    //  // Get the Coffee Document
    //  this.coffeeDoc = this.getCoffee(id);

    //  // Update the Coffee Document
    //  this.coffeeDoc.update(coffeeToUpdate)
    //  .catch(error => {
    //    console.log(error);
    //    throw new Error('Error: Could not update the Coffee.');
    //  });
   }

   /** Delete a Coffee */
   deleteCoffee(id) {

    // Get the Coffee Document
    this.coffeeDoc = this.getCoffee(id);

    // Delete the Coffee Document
    this.coffeeDoc.delete();
   }
}
