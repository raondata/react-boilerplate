import { Box, HStack, VStack } from '@chakra-ui/react';
import { H1, H2, H3, H4, H5 } from '@components/texts';
import {
  BoardColumn,
  DashboardPreviewItem,
  DashboardProvider,
  useDashboardData,
} from '@raondata/dashboard-module';
import { useMutation, useQuery } from '@hooks/api';
import { useState } from 'react';
import { dashboardConfig } from '@configs/dashboard-config';

const DashboardPage = () => {
  const { items } = useDashboardData();

  return (
    <VStack
      w="full"
      h="full"
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      // border={`1px solid red`}
    >
      <H1>대시보드</H1>
      <HStack>
        {items.map((item, index) => {
          return (
            <DashboardPreviewItem key={index} item={item} onEndDrag={() => {}}>
              <VStack
                borderWidth={1}
                borderColor={'gray.400'}
                w="full"
                h="full"
                rounded={'md'}
                p={2}
              >
                <H2>{item.name}</H2>
                <H4>{item.description}</H4>
              </VStack>
            </DashboardPreviewItem>
          );
        })}
      </HStack>
      <HStack w="full" h="full">
        <BoardColumn columnIndex={1}></BoardColumn>
        <BoardColumn columnIndex={2}></BoardColumn>
        <BoardColumn columnIndex={3}></BoardColumn>
      </HStack>
    </VStack>
  );
};

export default DashboardPage;
