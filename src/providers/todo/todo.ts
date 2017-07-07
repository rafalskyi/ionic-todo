import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { config } from '../../config';
import { JwtProvider } from '../../providers/jwt/jwt';
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
    return this.http.get(config.domain + '/api/todos', this.jwt.secure())
      .map((response:Response) => response.json());
  }


}
