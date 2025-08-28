import { Flex, HStack, Input, VStack } from '@chakra-ui/react';
import { H5 } from '@components/texts';
import dateUtils from '@utils/date-utils';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';

const PeriodInput = ({
  initDuration,
  onChange,
  position,
}: {
  initDuration: [Date, Date];
  onChange: (d: [DateObject, DateObject]) => void;
  position: string;
}) => {
  const [startYear, setStartYear] = useState<number>(
    initDuration[0].getFullYear()
  );
  const [startMonth, setStartMonth] = useState<number>(
    initDuration[0].getMonth() + 1
  );
  const [startDay, setStartDay] = useState<number>(initDuration[0].getDate());

  const [endYear, setEndYear] = useState<number>(initDuration[1].getFullYear());
  const [endMonth, setEndMonth] = useState<number>(
    initDuration[1].getMonth() + 1
  );
  const [endDay, setEndDay] = useState<number>(initDuration[1].getDate());

  const [isValidDate, setValidDate] = useState<boolean>(true);

  useEffect(() => {
    const startDateStr = `${startYear}-${startMonth}-${startDay}`;
    const endDateStr = `${endYear}-${endMonth}-${endDay}`;

    const valid =
      dateUtils.isValidDate(startYear, startMonth, startDay) &&
      dateUtils.isValidDate(endYear, endMonth, endDay) &&
      (dayjs(startDateStr)
        .startOf('day')
        .isBefore(dayjs(endDateStr).endOf('day'), 'day') ||
        dayjs(startDateStr)
          .startOf('day')
          .isSame(dayjs(endDateStr).endOf('day'), 'day'));
    if (valid) {
      onChange([new DateObject(startDateStr), new DateObject(endDateStr)]);
      // setSelectedDate(new DateObject(dateStr));
    }

    setValidDate(valid);
  }, [startYear, startDay, startMonth, endYear, endMonth, endDay]);

  useEffect(() => {
    setStartYear(initDuration[0].getFullYear());
    setStartMonth(initDuration[0].getMonth() + 1);
    setStartDay(initDuration[0].getDate());
    setEndYear(initDuration[1].getFullYear());
    setEndMonth(initDuration[1].getMonth() + 1);
    setEndDay(initDuration[1].getDate());
  }, [initDuration]);
  return (
    <VStack
      w="full"
      borderWidth={1}
      borderColor={isValidDate ? 'gray.300' : 'red.600'}
      gap={0}
    >
      <HStack
        as="div"
        p={2}
        pb={1}
        flexDir={'row'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <H5>시작</H5>
        <Input
          w={14}
          type="numeric"
          inputMode="tel"
          size="xs"
          max={9999}
          maxLength={4}
          borderColor={'gray.300'}
          // defaultValue={initDuration[0].getFullYear()}
          value={startYear}
          onChange={(e) => {
            const y = Number(e.target.value.replace(/\D/g, ''));
            setStartYear(y);
          }}
        />
        <H5>년</H5>
        <Input
          w={10}
          type="numeric"
          inputMode="tel"
          maxLength={2}
          size="xs"
          borderColor={'gray.300'}
          // defaultValue={initDuration[0]?.getMonth() + 1}
          value={startMonth}
          onChange={(e) => {
            const m = Number(e.target.value.replace(/\D/g, ''));
            setStartMonth(m);
          }}
        />
        <H5>월</H5>
        <Input
          w={10}
          type="numeric"
          inputMode="tel"
          maxLength={2}
          size="xs"
          borderColor={'gray.300'}
          // defaultValue={initDuration[0]?.getDate()}
          value={startDay}
          onChange={(e) => {
            const d = Number(e.target.value.replace(/\D/g, ''));
            setStartDay(d);
          }}
        />
        <H5>일</H5>
      </HStack>
      <HStack
        as="div"
        p={2}
        pt={1}
        flexDir={'row'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <H5>종료</H5>
        <Input
          w={14}
          type="numeric"
          inputMode="tel"
          size="xs"
          max={9999}
          maxLength={4}
          borderColor={'gray.300'}
          // defaultValue={initDuration[1]?.getFullYear()}
          value={endYear}
          onChange={(e) => {
            const y = Number(e.target.value.replace(/\D/g, ''));
            setEndYear(y);
          }}
        />
        <H5>년</H5>
        <Input
          w={10}
          type="numeric"
          inputMode="tel"
          maxLength={2}
          size="xs"
          borderColor={'gray.300'}
          // defaultValue={initDuration[1]?.getMonth() + 1}
          value={endMonth}
          onChange={(e) => {
            const m = Number(e.target.value.replace(/\D/g, ''));
            setEndMonth(m);
          }}
        />
        <H5>월</H5>
        <Input
          w={10}
          type="numeric"
          inputMode="tel"
          maxLength={2}
          size="xs"
          borderColor={'gray.300'}
          // defaultValue={initDuration[1]?.getDate()}
          value={endDay}
          onChange={(e) => {
            const d = Number(e.target.value.replace(/\D/g, ''));
            setEndDay(d);
          }}
        />
        <H5>일</H5>
      </HStack>
    </VStack>
  );
};

export default PeriodInput;
