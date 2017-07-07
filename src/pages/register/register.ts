import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name: string;
  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public UserProvider: UserProvider,
              public loadingCtrl: LoadingController,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {

    this.showLoader();

    let details = {
      email: this.email,
      password: this.password,
      name: this.name
    };

    this.UserProvider.create(details)
      .subscribe((result) => {
        this.loading.dismiss();
        console.log(result);
        let user = result.auth_token;
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.set('currentUser', JSON.stringify(user));
          this.navCtrl.setRoot(HomePage);
        }
      }, (err) => {
        this.loading.dismiss();
      });

  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
