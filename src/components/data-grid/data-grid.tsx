import { Box } from '@chakra-ui/react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { LegacyRef, ReactElement, useEffect, useState } from 'react';

type DataGridPropsType<T> = {
  cols: ColDef[];
  rowData: T[];
  rowSelection?: 'multiRow' | 'singleRow';
  onRowClicked?: (clicked: T) => void;
  ref?: LegacyRef<AgGridReact<T>>;
};

const InnerDataGrid = <T,>(
  {
    cols,
    rowData,
    rowSelection,
    onRowClicked,
  }: // ref,
  DataGridPropsType<T>,
  ref: LegacyRef<AgGridReact<T>>
) =>
  // ref: React.RefAttributes<AgGridReact<T>>
  //
  {
    const [$rowData, $setRowData] = useState<T[]>([]);
    const [$columnDefs, $setColumnDefs] = useState<ColDef[]>([]);

    useEffect(() => {
      if (cols) {
        $setColumnDefs([...cols]);
      }

      if (rowData) {
        $setRowData([...rowData]);
      }
    }, [cols, rowData]);

    return (
      <Box w="full" h="full">
        <AgGridReact<T>
          ref={ref}
          columnDefs={$columnDefs}
          rowData={$rowData}
          rowSelection={
            rowSelection && {
              mode: rowSelection,
            }
          }
          onRowSelected={(e) => {
            console.log('###', e);
          }}
          onRowClicked={(e) => {
            onRowClicked && onRowClicked(e.data!);
          }}
        />
      </Box>
    );
  };

function forwardRefDataGrid<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return React.forwardRef(render) as any;
}

export default forwardRefDataGrid(InnerDataGrid);
