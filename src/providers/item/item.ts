import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { config } from '../../config';
import { JwtProvider } from '../../providers/jwt/jwt';

import {Item} from '../../app/_models/item';
/*
  Generated class for the ItemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemProvider {

  constructor(public http: Http, private jwt:JwtProvider) {
    console.log('Hello ItemProvider Provider');
  }

  create(item:Item) {
    return this.http.post(config.domain + '/api/todos/' + item.todo_id + '/items', item, this.jwt.secure()).map((response:Response) => response.json());
  }

  getAll(todo_id:number) {
    return this.http.get(config.domain + '/api/todos/' + todo_id + '/items', this.jwt.secure()).map((response:Response) => response.json());
  }

  delete(item:Item) {
    return this.http.delete(config.domain + '/api/todos/' + item.todo_id + '/items/' + item.id, this.jwt.secure()).map((response:Response) => response.json());
  }

  update(item:Item) {
    return this.http.patch(config.domain + '/api/todos/' + item.todo_id + '/items/' + item.id, item, this.jwt.secure()).map((response:Response) => response.json());
  }

}
