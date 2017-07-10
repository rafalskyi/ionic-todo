import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import {Todo} from '../../app/_models/todo';
import {Item} from '../../app/_models/item';

import {TodoProvider} from '../../providers/todo/todo';
import {ItemProvider} from '../../providers/item/item';

/**
 * Generated class for the CardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  @ViewChild('itemInput') itemInput;

  todo: Todo;
  currentEditItemId: number;

  constructor(public navCtrl: NavController,
              private todoService: TodoProvider,
              private itemService: ItemProvider,
              private alertCtrl: AlertController,
              public navParams: NavParams) {
    this.todo = this.navParams.data;
  }

  private loadAllItems() {
    this.todoService.get(this.todo.id)
      .subscribe(todo => {
          this.todo = todo;
        },
        error => {
          //this.alertService.error(error);
        });
  }

  ionViewDidLoad() {
  }

  updateTitle(todo) {
    this.todoService.update(todo).subscribe(() => this.loadAllItems());
  }

  editItem(item:Item) {
    this.currentEditItemId = item.id;
    //TODO: need better solution
    setTimeout(() => {
      this.itemInput.setFocus();
    }, 150);
  };

  updateItem(item:Item) {
    this.currentEditItemId = null;
    if (!item.name) return;
    if (item.id) {
      this.itemService.update(item).subscribe(() => this.loadAllItems());
    } else {
      this.itemService.create(item).subscribe(() => this.loadAllItems());
    }
  };

  toggleItemComplete(item:Item) {
    item.done = !item.done;
    this.itemService.update(item).subscribe(() => this.loadAllItems());
  };

  addItem() {
    let newItem = new Item();
    newItem.todo_id = this.todo.id;
    this.todo.items.push(newItem);
  };

  removeItem(item:Item) {
    if (!item.id) {
      this.todo.items.pop();
      return;
    }

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.itemService.delete(item).subscribe(() => this.loadAllItems());
          }
        }
      ]
    });
    alert.present();
  };

  deleteTodo() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.todoService.delete(this.todo.id)
              .subscribe(() => {
                  this.navCtrl.pop();
                },
                error => {
                  //this.alertService.error(error);
                });
          }
        }
      ]
    });
    alert.present();
  }

}
