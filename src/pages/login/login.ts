import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';

import {AuthenticationProvider} from '../../providers/authentication/authentication';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;
  loading: any;
  res: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public authService: AuthenticationProvider,
              private googlePlus: GooglePlus) {
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();

  }

  ionViewDidLoad() {
    this.showLoader();

    //Check if already authenticated
    this.authService.isAuthenticated().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });
  }

  login() {

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials.email, credentials.password)
      .subscribe((result) => {
        this.loading.dismiss();
        console.log(result);
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
      });

  }

  socialLogin() {
    this.googlePlus.login({
      'webClientId': '272340719872-hboshp5mjl9d0mbf4th2ondilbm0jeor.apps.googleusercontent.com',
      'offline': true
    }).then((res) => {
      console.log(res);
      this.res = res
    }).catch(err => {
        console.error(err);
        this.res = err;
    })
  }

  logout(){

    this.googlePlus.logout().then(() => {
      console.log("logged out");
    });

  }

  launchSignup() {
    this.navCtrl.push(RegisterPage);
  }

}
