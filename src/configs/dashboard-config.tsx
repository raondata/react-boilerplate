import { Box } from '@chakra-ui/react';
import { H2 } from '@components/texts';
import { DashboardConfigItemType } from '@raondata/dashboard-module';

export const dashboardConfig: { items: DashboardConfigItemType[] } = {
  items: [
    {
      type: 'dashboard-1',
      name: '대시보드 1',
      graphType: 'LINE',
      description: '대시보드 1 설명',
      component: (applyFilter) => {
        return (
          <Box w="full" bg="red.100">
            <H2>대시보드1</H2>
          </Box>
        );
      },
    },
    {
      type: 'dashboard-2',
      name: '대시보드 2',
      graphType: 'BAR',
      description: '대시보드 2 설명',
      component: (applyFilter) => {
        return (
          <Box w="full" bg="blue.100">
            <H2>대시보드2</H2>
          </Box>
        );
      },
    },
    {
      type: 'dashboard-3',
      name: '대시보드 3',
      graphType: 'PIE',
      description: '대시보드 3 설명',
      component: (applyFilter) => {
        return (
          <Box w="full" bg="green.100">
            <H2>대시보드3</H2>
          </Box>
        );
      },
    },
  ],
};
