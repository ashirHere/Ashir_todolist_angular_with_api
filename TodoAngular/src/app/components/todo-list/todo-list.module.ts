import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      TodoListRoutingModule
    ],
    declarations: [TodoListComponent]
  })

export class TodoListModule { }