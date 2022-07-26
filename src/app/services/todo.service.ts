import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { Todo } from '../models/todo.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public readonly storageKey = 'angular.todo';

  private todos: Todo[] = [];
  private filteredTodos: Todo[] = [];

  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private sizeSubject = new BehaviorSubject<number>(0);

  private currentFilter = Filter.ALL;

  todos$ = this.todosSubject.asObservable();
  size$ = this.sizeSubject.asObservable();

  constructor(private storageService: StorageService) {}

  updateObserver() {
    this.todosSubject.next(this.filteredTodos);
    this.sizeSubject.next(this.todos.length);
  }

  getFromStorage() {
    this.todos =
      (this.storageService.getObject(this.storageKey) as Todo[]) || [];
    this.filteredTodos = [...this.todos];
    this.updateObserver();
  }

  filterTodos(filter: Filter) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.COMPLETED:
        this.filteredTodos = this.todos.filter((t) => t.completed);
        break;

      case Filter.INCOMPLETED:
        this.filteredTodos = this.todos.filter((t) => !t.completed);
        break;

      default:
        this.filteredTodos = [...this.todos];
        break;
    }
    this.updateObserver();
  }

  updateStorage() {
    this.storageService.setObject(this.storageKey, this.todos);
    this.filterTodos(this.currentFilter);
  }

  addTodo(content: string): boolean {
    const newTodo = new Todo(Date.now(), content);
    this.todos.unshift(newTodo);
    this.updateStorage();
    return true;
  }

  updateTodo(todo: Todo) {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      this.todos[index] = { ...todo };
      this.updateStorage();
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.updateStorage();
  }

  toggle() {
    const isAllCompleted = this.todos.every((t) => t.completed);
    this.todos = this.todos.map((t) => ({ ...t, completed: !isAllCompleted }));
    this.updateStorage();
  }

  removeAllCompleted() {
    this.todos = this.todos.filter((t) => !t.completed);
    this.updateStorage();
  }

}
