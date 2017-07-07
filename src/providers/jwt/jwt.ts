import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/*
  Generated class for the JwtProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class JwtProvider {

  constructor(public authService: AuthenticationProvider) {
  }

  // create header with jwt token
  public secure() {
    let currentUser = this.authService.currentUser;
    if (currentUser && currentUser.token) {
      var headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    }
    return new RequestOptions({headers: headers});
  }
}
