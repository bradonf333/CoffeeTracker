import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Coffee } from './app.model';
import { config } from './app.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CoffeeTracker';
  coffeeCollection: AngularFirestoreCollection<Coffee>;
  coffees: Observable<Coffee[]>;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.coffeeCollection = this.db.collection('coffee');
    this.coffees = this.coffeeCollection.valueChanges();
  }
}
