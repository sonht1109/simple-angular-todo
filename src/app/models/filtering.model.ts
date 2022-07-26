export interface FilterButton {
  type: Filter;
  label: string;
}

export enum Filter {
  ALL = 'all',
  COMPLETED = 'completed',
  INCOMPLETED = 'incompleted',
}
