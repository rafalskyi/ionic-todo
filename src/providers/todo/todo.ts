import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtProvider } from '../../providers/jwt/jwt';

import {Todo} from '../../app/_models/todo';
/*
  Generated class for the TodoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TodoProvider {

  constructor(public http: Http,
              private jwt:JwtProvider
  ) {
    console.log('Hello TodoProvider Provider');
  }

  getAll() {
    return this.http.get('/api/todos', this.jwt.secure())
      .map((response:Response) => response.json());
  }

  get(id:number) {
    return this.http.get('/api/todos/' + id, this.jwt.secure())
      .map((response:Response) => response.json());
  }

  update(todo:Todo) {
    return this.http.patch('/api/todos/' + todo.id, todo, this.jwt.secure())
      .map((response:Response) => response.json());
  }

  create(todo:Todo) {
    return this.http.post('/api/todos/', todo, this.jwt.secure())
      .map((response:Response) => response.json());
  }

  delete(id:number) {
    return this.http.delete('/api/todos/' + id, this.jwt.secure())
      .map((response:Response) => response.json());
  }
}
