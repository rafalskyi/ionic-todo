import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public authService: AuthenticationProvider) {
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

  launchSignup() {
    this.navCtrl.push(RegisterPage);
  }

}
