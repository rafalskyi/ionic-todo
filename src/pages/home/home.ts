import {Component} from '@angular/core';
import {
  NavController,
  ModalController,
  AlertController,
  LoadingController,
  NavParams
} from 'ionic-angular';

import {AuthenticationProvider} from '../../providers/authentication/authentication';
import {TodoProvider} from '../../providers/todo/todo';

import {User} from '../../app/_models/user';
import {Todo} from '../../app/_models/todo';

import {LoginPage} from '../login/login';
import {CardPage} from '../card/card';
import { TodoComponent } from '../../components/todo/todo';

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
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.currentUser = new User();
  }

  private loadAll() {
    this.todoService.getAll()
      .subscribe((data) => {
        this.todos = data;
      }, (err) => {
        console.log("not allowed");
        //this.logout();
      });
  }

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ionViewDidLoad() {
    this.currentUser = this.authService.currentUser;
  }
  ionViewWillEnter() {
    this.loadAll();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  editCard(todo) {
    this.navCtrl.push(CardPage, todo);
  }

  addTodo() {
    let profileModal = this.modalCtrl.create(TodoComponent, { testData: 8675309 });
    profileModal.present();
    profileModal.onDidDismiss(todo => {
      if (todo) {
        this.todos.push(todo);
      }
    });
  }

}
