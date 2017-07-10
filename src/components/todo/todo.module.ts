import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TodoComponent } from './todo';

@NgModule({
  declarations: [
    TodoComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoComponentModule {}
