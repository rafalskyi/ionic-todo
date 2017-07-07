export class Item {
  id: number;
  todo_id: number;
  name: string = '';
  done: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
