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
  coffees: Observable<Coffee[]>;
  snapshot: any;

  constructor(private db: AngularFirestore, private coffeeService: CoffeeService) {}

  ngOnInit() {
    this.coffeeCollection = this.db.collection(config.collection_endpoint);

    this.coffees = this.coffeeCollection.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Coffee;
      // console.log(data);
      const id = a.payload.doc.id;
      return { id, ...data };
    })));
  }
}
