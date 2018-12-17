import { Injectable } from '@angular/core';

import { config } from './app.config';
import { Coffee } from './Coffee';

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
     return this.db.collection<Coffee>(config.collection_endpoint).valueChanges();
   }

   /** Return the Coffees from the DB */
   getCoffee(id) {
     return this.db.doc<Coffee>(`${config.collection_endpoint}/${id}`);
  }

   /** Add the new Coffee to the collection */
   addCoffee(coffee) {
     this.coffees.add(coffee);
   }

   /** Update an existing Coffee */
   updateCoffee(id: string, coffeeToUpdate: Coffee) {

     // Get the Coffee Document
     this.coffeeDoc = this.getCoffee(id);

     // Update the Coffee Document
     this.coffeeDoc.update(coffeeToUpdate)
     .catch(error => {
       console.log(error);
       throw new Error('Error: Could not update the Coffee.');
     });
   }

   /** Delete a Coffee */
   deleteCoffee(id) {

    // Get the Coffee Document
    this.coffeeDoc = this.getCoffee(id);

    // Delete the Coffee Document
    this.coffeeDoc.delete();
   }
}
