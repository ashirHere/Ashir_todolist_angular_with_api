import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  todoTitle: string = '';
  // idForTodo: string = '';
  beforeEditCache: string = '';
  allChecked: boolean = false;
  filter: string = 'all';
  todos: Todo[] = [];

  constructor(public http: HttpClient) {
    this.todos = this.getTodos();
  }

  getTodos(): Todo[] {
    this.http.get(API_URL + '/users')
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.todos = response.users;
        console.log(this.todos);
      })

    return this.todos;
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Something went wrong!!!!');
  }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }
    this.http.post(API_URL + '/users', {
      title: todoTitle,
      completed: false
    })
      .subscribe((response: any) => {
        this.todos.push({
          _id: response._id,
          title: todoTitle,
          completed: false,
          editing: false
        });
      });
    // this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;

    this.http.put(API_URL + '/users/' + todo._id, {
      title: todo.title,
      completed: todo.completed
    })
      .subscribe((response: any) => {

      })
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: string): void {

    this.http.delete(API_URL + '/users/' + id)
      .subscribe((response: any) => {
        // console.log(id);
        this.todos = this.todos.filter(todo => todo._id !== id);

      })
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
    this.todos.forEach((todo) => (todo.completed = this.allChecked));
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}

















// {
//   id: 1,
//   title: 'Install NodeJS',
//   'completed': false,
//   'editing': false
// },
// {
//   id: 2,
//   title: 'Install Angular CLI',
//   'completed': false,
//   'editing': false
// },
//   {
//     id: 3,
//     title: 'Create New App',
//     'completed': false,
//     'editing': false
//   }
// ]