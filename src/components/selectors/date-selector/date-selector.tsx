import 'react-multi-date-picker/styles/colors/purple.css';

import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { months, weekDays } from '@configs/date-configs';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import {
  BorderGrayButton,
  GrayButton,
  PrimaryButton,
} from '@components/buttons';
import { H4, H5 } from '@components/texts';
import dateUtils from '@utils/date-utils';
import DateInput from '../date-input';

const DateSelector = ({
  minDate,
  maxDate,
  onSelect,
  initDate = new Date(),
  timePicker,
  disabled,
}: {
  minDate?: Date;
  maxDate?: Date;
  onSelect?: (selected: Date) => void;
  timePicker?: boolean;
  initDate?: Date;
  disabled?: boolean;
}) => {
  const [selectedDate, setSelectedDate] = useState<DateObject>(
    new DateObject(initDate)
  );
  const [isClose, setClose] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isClose && datePickerRef.current) datePickerRef.current.closeCalendar();
    setClose(false);
  }, [isClose]);

  useEffect(() => {
    setSelectedDate(new DateObject(initDate));
  }, [initDate]);

  return (
    <DatePicker
      className="green"
      ref={datePickerRef}
      months={months}
      disabled={disabled}
      value={selectedDate}
      weekDays={weekDays}
      minDate={minDate || undefined}
      maxDate={maxDate || new Date()}
      onClose={() => isClose}
      plugins={[
        timePicker ? (
          <TimePicker position="bottom" />
        ) : (
          <DateInput
            initDate={initDate}
            onChange={setSelectedDate}
            position="top"
          />
        ),
      ]}
      render={(value: any, openCalendar: any) => {
        return (
          <BorderGrayButton
            onClick={openCalendar}
            size={'sm'}
            bg={value && !disabled ? 'white' : 'gray.50'}
            pointerEvents={(disabled && 'none') || undefined}
            borderColor={'gray.400'}
          >
            <H4
              fontWeight={'bold'}
              fontSize={'sm'}
              // color={value && 'gray.50'}
            >
              {selectedDate?.format(
                timePicker ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
              ) || '선택'}
            </H4>
          </BorderGrayButton>
        );
      }}
      onChange={(date: DateObject) => {
        const valueDt = dayjs(date.toDate());

        if (minDate && valueDt.isBefore(minDate)) {
          // selectedValue.current = undefined;
        } else if (maxDate && valueDt.isAfter(maxDate)) {
          // selectedValue.current = undefined;
        } else {
          setSelectedDate(date);
        }
      }}
    >
      <Flex
        w="full"
        pb={2}
        px={2}
        gap={2}
        justifyContent={'center'}
        alignItems={'flex-end'}
      >
        <PrimaryButton
          onClick={() => {
            setClose(true);
            if (onSelect && selectedDate) {
              onSelect(selectedDate.toDate());
            }
          }}
          size="sm"
        >
          <H4 fontWeight={'700'}>적용</H4>
        </PrimaryButton>
        <GrayButton
          size="sm"
          onClick={() => {
            setSelectedDate(new DateObject(initDate));
            setClose(true);
          }}
        >
          <H4 fontWeight={'700'}>닫기</H4>
        </GrayButton>
      </Flex>
    </DatePicker>
  );
};

export default DateSelector;
