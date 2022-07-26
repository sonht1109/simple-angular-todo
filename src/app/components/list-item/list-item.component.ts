import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  isEditing = false;

  @Input() todo!: Todo;
  @Input() isLast: boolean = false;
  @Output() handleUpdate = new EventEmitter<Todo>();
  @Output() handleRemove = new EventEmitter<number>();

  onSubmit(event: any) {
    event.preventDefault();
    this.handleUpdate.emit(this.todo);
    this.isEditing = false;
  }

  onUpdateTodoStatus() {
    this.handleUpdate.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }

  onRemoveTodo() {
    this.handleRemove.emit(this.todo.id);
  }

  constructor() {}

  ngOnInit(): void {}
}
