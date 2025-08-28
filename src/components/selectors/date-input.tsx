import { Flex, Input } from '@chakra-ui/react';
import { H5 } from '@components/texts';
import dateUtils, { isSame } from '@utils/date-utils';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';

const DateInput = ({
  initDate,
  onChange,
  position,
}: {
  initDate: Date;
  onChange: (d: DateObject) => void;
  position: string;
}) => {
  const [year, setYear] = useState<number>(initDate.getFullYear());
  const [month, setMonth] = useState<number>(initDate.getMonth() + 1);
  const [day, setDay] = useState<number>(initDate.getDate());

  const [isValidDate, setValidDate] = useState<boolean>(true);

  useEffect(() => {
    const dateStr = `${year}-${month}-${day}`;
    const valid = dateUtils.isValidDate(year, month, day);
    if (valid) {
      onChange(new DateObject(dateStr));
      // setSelectedDate(new DateObject(dateStr));
    }
    setValidDate(valid);
  }, [year, month, day]);

  useEffect(() => {
    setYear(initDate.getFullYear());
    setMonth(initDate.getMonth() + 1);
    setDay(initDate.getDate());
  }, [initDate]);
  return (
    <Flex
      as="div"
      p={2}
      flexDir={'row'}
      gap={2}
      justifyContent={'center'}
      alignItems={'center'}
      borderWidth={1}
      borderColor={isValidDate ? 'gray.300' : 'red.600'}
    >
      <Input
        w={16}
        type="numeric"
        inputMode="tel"
        size="xs"
        max={9999}
        maxLength={4}
        borderColor={'gray.300'}
        value={year}
        onChange={(e) => {
          const y = Number(e.target.value.replace(/\D/g, ''));
          setYear(y);
        }}
      />
      <H5>년</H5>
      <Input
        w={12}
        type="numeric"
        inputMode="tel"
        maxLength={2}
        size="xs"
        borderColor={'gray.300'}
        value={month}
        onChange={(e) => {
          const m = Number(e.target.value.replace(/\D/g, ''));
          setMonth(m);
        }}
      />
      <H5>월</H5>
      <Input
        w={12}
        type="numeric"
        inputMode="tel"
        maxLength={2}
        size="xs"
        borderColor={'gray.300'}
        value={day}
        onChange={(e) => {
          const d = Number(e.target.value.replace(/\D/g, ''));
          setDay(d);
        }}
      />
      <H5>일</H5>
    </Flex>
  );
};

export default DateInput;
