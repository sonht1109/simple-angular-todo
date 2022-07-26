import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  todos: Todo[] = [
    {
      content: 'Todot 1',
      id: 1,
      completed: false,
    },
    {
      content: 'Todot 2',
      id: 2,
      completed: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
