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
    // Get the Coffee Collection
    this.coffees = db.collection<Coffee>(config.collection_endpoint);
   }

   addCoffee(coffee) {
    // Add the new coffee to the collection
    this.coffees.add(coffee);
  }

  updateCoffee(id, update) {
    // Get the Coffee document
    this.coffeeDoc = this.db.doc<Coffee>(`${config.collection_endpoint}/${id}`);

    // Update the Coffee document
    this.coffeeDoc.update(update);
  }

  deleteCoffee(id) {
    // Get the Coffee document
    this.coffeeDoc = this.db.doc<Coffee>(`${config.collection_endpoint}/${id}`);

    // Delete the Coffee document
    this.coffeeDoc.delete();
  }
}
