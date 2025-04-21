import { Box, Center, Progress, Text } from '@chakra-ui/react';
import type { ColDef } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  CsvExportModule,
  ModuleRegistry,
  provideGlobalGridOptions,
  RowSelectionModule,
  themeQuartz,
  ValidationModule,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { LegacyRef } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { DataGridPropsType } from '@@types/client-types';

provideGlobalGridOptions({ theme: themeQuartz });
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  RowSelectionModule,
  CsvExportModule,
]);

const InnerDataGrid = <T,>(
  {
    cols,
    rowData,
    rowSelection,
    onRowClicked,
    isLoading,
  }: // ref,
  DataGridPropsType<T>,
  ref: LegacyRef<AgGridReact<T>>
) =>
  // ref: React.RefAttributes<AgGridReact<T>>
  //
  {
    const [$rowData, $setRowData] = useState<T[]>([]);
    const [$columnDefs, $setColumnDefs] = useState<ColDef[]>([]);
    const selectedRowIndex = useRef<number>(-1);

    useEffect(() => {
      if (cols) {
        $setColumnDefs([...cols]);
      }
    }, [cols]);

    useEffect(() => {
      if (rowData) {
        $setRowData([...rowData]);
      }
    }, [rowData]);

    return (
      <Box w="full" h="full" pos="relative">
        {isLoading === true && (
          <Center
            w="full"
            h="full"
            pos="absolute"
            left={0}
            top={0}
            bg="white"
            flexDir={'column'}
            gap={4}
          >
            <Text>Loading</Text>
            <Box w={20} rounded={'xl'} overflow={'hidden'}>
              <Progress size="sm" isIndeterminate ringColor={'point.400'} />
            </Box>
          </Center>
        )}
        <AgGridReact<T>
          ref={ref}
          columnDefs={$columnDefs}
          rowData={$rowData}
          rowSelection={
            rowSelection === 'singleRow' ? 'single' : { mode: 'multiRow' }
          }
          gridOptions={{
            enableCellTextSelection: true,
          }}
          onRowClicked={(e) => {
            if (selectedRowIndex.current === e.rowIndex) {
              // selectedRowIndex.current = -1;
              // e.api.deselectAll();
              // if (onRowClicked) onRowClicked(undefined);
            } else {
              if (e.rowIndex !== null) {
                selectedRowIndex.current = e.rowIndex;
              }
              if (onRowClicked) onRowClicked(e.data);
            }
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
