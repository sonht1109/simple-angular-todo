import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list-handle',
  templateUrl: './list-handle.component.html',
  styleUrls: ['./list-handle.component.less'],
})
export class ListHandleComponent implements OnInit, OnDestroy {
  filters: FilterButton[] = [
    {
      label: 'All',
      type: Filter.ALL,
    },
    {
      label: 'Completed',
      type: Filter.COMPLETED,
    },
    {
      label: 'Incompleted',
      type: Filter.INCOMPLETED,
    },
  ];

  size!: number;
  filter: Filter = Filter.ALL;
  hasCompleted$!: Observable<boolean>;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private todoService: TodoService) {}

  onFilter(value: Filter) {
    this.filter = value;
    this.todoService.filterTodos(value);
  }

  onRemoveCompleted() {
    this.todoService.removeAllCompleted();
  }

  ngOnInit(): void {
    // unsubcribe onDestroy by using takeUntil
    this.todoService.size$
      .pipe(takeUntil(this.destroy$))
      .subscribe((size) => (this.size = size));
    this.hasCompleted$ = this.todoService.todos$.pipe(
      map((todos) => todos.some((t) => t.completed)),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
