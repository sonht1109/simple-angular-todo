import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  content!: string;

  constructor(private todoService: TodoService) {}

  onSubmit() {
    const value = this.content.trim();
    if (value) {
      const res = this.todoService.addTodo(value);
      if (res) {
        this.content = '';
      }
    }
  }

  onToggle() {
    this.todoService.toggle();
  }

  ngOnInit(): void {}
}
