import { Coffee, Coffee2 } from './Coffee';

/**
 * CoffeeConfirmation Interface.
 * Contains an added Mode enum, to know what to do with the Coffee.
 * i.e. Update or Delete.
 */
export interface CoffeeConfirmation {
  coffee: Coffee;
  mode: Mode;
}

export interface CoffeeConfirmation2 {
  coffee: Coffee2;
  mode: Mode;
}

export enum Mode {
  Edit = 'Edit',
  Delete = 'Delete',
  Add = 'Add',
  None = 'None'
}
