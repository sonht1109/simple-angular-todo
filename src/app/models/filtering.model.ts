export interface FilterButton {
  type: Filter;
  label: string;
}

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
