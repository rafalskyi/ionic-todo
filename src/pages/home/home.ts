import {Component} from '@angular/core';
import {
  NavController,
  ModalController,
  AlertController,
  LoadingController
} from 'ionic-angular';

import {AuthenticationProvider} from '../../providers/authentication/authentication';
import {TodoProvider} from '../../providers/todo/todo';

import {User} from '../../app/_models/user';
import {Todo} from '../../app/_models/todo';

import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: User;
  todos: Array<Todo>;
  loading: any;

  constructor(public navCtrl: NavController,
              public authService: AuthenticationProvider,
              public todoService: TodoProvider,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {
    this.currentUser = new User();
  }

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ionViewDidLoad() {
    this.currentUser = this.authService.currentUser;

    this.todoService.getAll()
      .subscribe((data) => {
        this.todos = data;
      }, (err) => {
        console.log("not allowed");
        //this.logout();
      });

  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
