import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {AddTodoComponent} from "./add-todo.component";

@Component({
  selector: 'todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  // These are the target values used in searching.
  // We should rename them to make that clearer.
  public todoId: string;
  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoCategory: string;

  // The ID of the
  private highlightedID: string = '';

  // Inject the TodoListService into this component.
  constructor(public todoListService: TodoListService, public dialog: MatDialog) {

  }

  isHighlighted(todo: Todo): boolean {
    return todo._id['$oid'] === this.highlightedID;
  }

  openDialog(): void {
    const newTodo: Todo = {_id: '', owner: '', status: '', category: '', body: ''};
    const dialogRef = this.dialog.open(AddTodoComponent, {
      width: '500px',
      data: {todo: newTodo}
    });

    dialogRef.afterClosed().subscribe(newTodo => {
      if (newTodo != null) {
        this.todoListService.addNewTodo(newTodo).subscribe(
          result => {
            this.highlightedID = result;
            this.refreshTodos();
          },
          err => {
            // This should probably be turned into some sort of meaningful response.
            console.log('There was an error adding the todo.');
            console.log('The newTodo or dialogResult was ' + newTodo);
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

  public filterTodos(searchBody: string, searchOwner: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by body
    if (searchBody != null) {
      searchBody = searchBody.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }

    return this.filteredTodos;
  }

  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      todos => {
        this.todos = todos;
        this.filterTodos(this.todoOwner, this.todoBody);
      },
      err => {
        console.log(err);
      });
    return todos;
  }

  loadService(): void {
    this.todoListService.getTodos(this.todoStatus, this.todoCategory).subscribe(
      todos => {
        this.todos = todos;
        this.filteredTodos = this.todos;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.refreshTodos();
    this.loadService();
  }
}
