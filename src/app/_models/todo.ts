import { Item } from '../_models/item';

export class Todo {
  id: number;
  title: string = '';
  items: Item[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
