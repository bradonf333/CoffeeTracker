import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoffeeService } from '../coffee.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { ICoffee } from '../ICoffee';

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.css']
})
export class CoffeeEditComponent implements OnInit, OnDestroy {

  description = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  id: string;
  private sub: any;
  coffeeDescription: string;
  coffeeDate: Date;
  coffeeDocToEdit: AngularFirestoreDocument<ICoffee>;

  constructor(private route: ActivatedRoute, private coffeeService: CoffeeService) {
    this.route.params.subscribe();
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('This is the id we pulled from the route: ', this.id);
      this.coffeeDocToEdit = this.coffeeService.getCoffee(this.id);
    });

    const coffeeToEdit = this.coffeeService.getCoffee(this.id).valueChanges();
    coffeeToEdit.subscribe(value => {
      this.coffeeDescription = value.description;
      this.coffeeDate = value.date;
    });
    console.log(coffeeToEdit);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getErrorMessage(validator: FormControl) {
    return validator.hasError('required') ? 'You must enter a value' : '';
  }

}
