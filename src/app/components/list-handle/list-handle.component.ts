import { Component, OnInit } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';

@Component({
  selector: 'app-list-handle',
  templateUrl: './list-handle.component.html',
  styleUrls: ['./list-handle.component.less'],
})
export class ListHandleComponent implements OnInit {
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

  length = 10;

  filter: Filter = Filter.ALL

  onFilter(type: Filter) {
    console.log(type);
  }

  constructor() {}

  ngOnInit(): void {}
}
