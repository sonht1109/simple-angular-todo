import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  isEditing = false;
  isHovered = false;

  @Input() todo: Todo | null = null;
  @Input() isLast: boolean = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseOut() {
    this.isHovered = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
