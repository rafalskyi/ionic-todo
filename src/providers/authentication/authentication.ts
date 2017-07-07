import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { config } from '../../config';
import { Storage } from '@ionic/storage';
import { User } from '../../app/_models/user';
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  public currentUser: User;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AuthenticationProvider Provider');
  }

  isAuthenticated(){
    return this.storage.get('currentUser').then((currentUser) => {
      this.currentUser = JSON.parse(currentUser);
      return (this.currentUser.token && this.currentUser.token.length)  ? true : false;
    });

  }

  login(email:string, password:string){
    return this.http.post(config.domain + '/api/auth/login', {email: email, password: password})
      .map((response:Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.set('currentUser', JSON.stringify(user));
        }
      });
  }

  logout(){
    this.storage.set('currentUser', '');
    this.currentUser = null;
  }

}
