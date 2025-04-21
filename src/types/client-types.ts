import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { LegacyRef } from 'react';

export type DataGridPropsType<T> = {
  cols: ColDef[];
  rowData?: T[];
  rowSelection?: 'multiRow' | 'singleRow';
  onRowClicked?: (clicked: T | undefined) => void;
  isLoading?: boolean;
  ref?: LegacyRef<AgGridReact<T>>;
};

export type PageType<T> = {
  page: number;
  size: number;
  count: number;
  total: number;
  result: T[];
};
