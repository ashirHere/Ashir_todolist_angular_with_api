import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(300, style({ opacity: 1, transform: 'translateY(0px)' }))
      ]),

      transition(':leave', [
        animate(300, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),
    ])
  ]
})

export class TodoListComponent implements OnInit {
  todoTitle: string = '';
  // idForTodo: number = 0;
  // beforeEditCache: string = '';
  // allChecked: boolean = false;
  // filter: string = 'all';
  // todos: Todo[] = [];

  constructor(public todoService: TodoService) {
    // this.todoService = todoService;
  }

  ngOnInit() {
    // this.filter = 'all';
    // this.beforeEditCache = '';
    // this.idForTodo = 4;
    this.todoTitle = '';
    // this.todos = [
    //   {
    //     id: 1,
    //     title: 'Install NodeJS',
    //     'completed': false,
    //     'editing': false
    //   },
    //   {
    //     id: 2,
    //     title: 'Install Angular CLI',
    //     'completed': false,
    //     'editing': false
    //   },
    //   {
    //     id: 3,
    //     title: 'Create New App',
    //     'completed': false,
    //     'editing': false
    //   }
    // ];
  }



  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }

  // editTodo(todo: Todo): void {
  //   this.beforeEditCache = todo.title;
  //   todo.editing = true;
  // }

  // doneEdit(todo: Todo): void {
  //   if (todo.title.trim().length === 0) {
  //     todo.title = this.beforeEditCache;
  //   }
  //   todo.editing = false;
  // }

  // cancelEdit(todo: Todo): void {
  //   todo.title = this.beforeEditCache;
  //   todo.editing = false;
  // }

  // deleteTodo(id: number): void {
  //   this.todos = this.todos.filter(todo => todo.id !== id);
  // }

  // remaining(): number {
  //   return this.todos.filter(todo => !todo.completed).length;
  // }

  // atLeastOneCompleted(): boolean {
  //   return this.todos.filter(todo => todo.completed).length > 0;
  // }

  // clearCompleted(): void {
  //   this.todos = this.todos.filter(todo => !todo.completed);
  // }

  // checkAllTodos(): void {
  //   this.todos.forEach((todo) => (todo.completed = this.allChecked));
  // }

  // todosFiltered(): Todo[] {
  //   if (this.filter === 'all') {
  //     return this.todos;
  //   } else if (this.filter === 'active') {
  //     return this.todos.filter(todo => !todo.completed);
  //   } else if (this.filter === 'completed') {
  //     return this.todos.filter(todo => todo.completed);
  //   }

  //   return this.todos;
  // }
}