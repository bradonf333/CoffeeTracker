import { ICoffee } from './ICoffee';

/**
 * CoffeeConfirmation Interface.
 * Contains an added Mode enum, to know what to do with the Coffee.
 * i.e. Update or Delete.
 */
export interface ICoffeeConfirmation {
  coffee: ICoffee;
  mode: Mode;
}

export enum Mode {
  Edit = 'Edit',
  Delete = 'Delete',
  None = 'None'
}
