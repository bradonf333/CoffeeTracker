import { Injectable } from '@angular/core';

import { config } from './app.config';
import { Coffee } from './app.model';

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

   /// Add the new Coffee to the collection
   addCoffee(coffee) {
     this.coffees.add(coffee);
   }

   /// Update an existing Coffee
   updateCoffee(id, update) {

     // Get the Coffee Document
     this.coffeeDoc = this.db.doc<Coffee>(`${config.collection_endpoint}/${id}`);

     // Update the Coffee Document
     this.coffeeDoc.update(update);
   }

   /// Delete a Coffee
   deleteCoffee(id) {

    // Get the Coffee Document
    this.coffeeDoc = this.db.doc<Coffee>(`${config.collection_endpoint}/${id}`);

    // Delete the Coffee Document
    this.coffeeDoc.delete();
   }
}
