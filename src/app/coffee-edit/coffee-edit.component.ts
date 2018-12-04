import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoffeeService } from '../coffee.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { ICoffee } from '../ICoffee';
import { Observable } from 'rxjs';
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
  coffeeObservable: Observable <ICoffee> ;
  coffeeDocToEdit: ICoffee;

  constructor(private route: ActivatedRoute, private coffeeService: CoffeeService) {
    this.route.params.subscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.coffeeObservable = this.coffeeService.getCoffee(this.id).valueChanges();
    this.coffeeObservable.subscribe(coffee => {
      this.coffeeDescription = coffee.description;
      this.coffeeDate = coffee.date;

      // Initialize the CoffeeToEdit here so that it is not null
      this.coffeeDocToEdit = coffee;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getErrorMessage(validator: FormControl) {
    return validator.hasError('required') ? 'You must enter a value' : '';
  }

  /** Edit Coffee */
  editCoffee() {

    this.coffeeDocToEdit.description = this.coffeeDescription;
    this.coffeeDocToEdit.date = this.coffeeDate;

    this.coffeeService.updateCoffee(this.id, this.coffeeDocToEdit);
    alert('Success');
  }
}
