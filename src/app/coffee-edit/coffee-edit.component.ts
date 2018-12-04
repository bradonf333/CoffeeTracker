import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { CoffeeService } from '../coffee.service';
import { MatDialog } from '@angular/material';
import { ICoffee } from '../ICoffee';
import { Observable } from 'rxjs';
import { CoffeeEditConfirmationComponent } from '../coffee-edit-confirmation/coffee-edit-confirmation.component';

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
  isDisabled: true;

  constructor(
    private route: ActivatedRoute,
    private coffeeService: CoffeeService,
    public dialog: MatDialog
    ) {
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

  disableSubmitButton() {
    if (this.description.hasError('required') || this.date.hasError('required')) {
      return true;
    } else {
      return false;
    }
  }

  /** Edit Coffee */
  editCoffee() {

    this.coffeeDocToEdit.description = this.coffeeDescription;
    this.coffeeDocToEdit.date = this.coffeeDate;

    this.coffeeService.updateCoffee(this.id, this.coffeeDocToEdit);

    this.successDialog();
    // this.router.navigate(['/coffee-data-list']);
  }

  successDialog(): void {
    const dialogRef = this.dialog.open(CoffeeEditConfirmationComponent, {
      width: '80%',
      maxWidth: '450px',
      data: {description: this.coffeeDescription, date: this.coffeeDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
