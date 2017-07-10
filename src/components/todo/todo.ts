import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import {TodoProvider} from '../../providers/todo/todo';
import {Todo} from "../../app/_models/todo";

/**
 * Generated class for the TodoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'todo',
  templateUrl: 'todo.html'
})
export class TodoComponent {

  todo: Todo;

  constructor(private params: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController,
              private todoService: TodoProvider) {
    console.log('test pass data UserId', params.get('testData'));
    this.todo = {title: '', items:[]};
  }

  addTodo() {
    this.todoService.create(this.todo)
      .subscribe((todo) => {
        this.viewCtrl.dismiss(todo);
      }, (err) => {
        console.log("not allowed");
        //this.logout();
      });
  }

  cancel() {
    this.navCtrl.pop();
  }
}
