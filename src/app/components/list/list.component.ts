import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  destroy$: Subject<void> = new Subject<void>();

  constructor(private todoService: TodoService) {}

  handleUpdate(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  handleRemove(id: number) {
    this.todoService.removeTodo(id);
  }

  ngOnInit(): void {
    this.todoService.todos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((todos) => (this.todos = todos));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
