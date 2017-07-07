export class User {
  id?:number;
  token?:string;
  name:string;
  email:string;
  password?:string;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
