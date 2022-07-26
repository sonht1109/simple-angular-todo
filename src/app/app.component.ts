import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  hasTodo$!: Observable<boolean>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getFromStorage();
    this.hasTodo$ = this.todoService.size$.pipe(map(length => length > 0));
  }
}
