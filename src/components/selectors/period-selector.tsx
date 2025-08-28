import { Box, Flex, HStack, Icon } from '@chakra-ui/react';
import {
  BorderGrayButton,
  GrayButton,
  PrimaryButton,
} from '@components/buttons';
import { H4 } from '@components/texts';
import { months, weekDays } from '@configs/date-configs';
import dateUtils, { isSame } from '@utils/date-utils';
import { useEffect, useRef, useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import PeriodInput from './period-input';

const PeriodSelector = ({
  initPeriod,
  onChange,
  isDisabled,
  size,
}: {
  initPeriod: [Date, Date];
  onChange: (val: [Date, Date]) => void;
  isDisabled?: boolean;
  size?: string;
}) => {
  const [duration, setDuration] = useState<[DateObject, DateObject]>([
    new DateObject(initPeriod[0]),
    new DateObject(initPeriod[1]),
  ]);

  const [isClose, setClose] = useState<boolean>(false);
  const datePickerRef = useRef(null);
  useEffect(() => {
    if (isClose && datePickerRef.current) datePickerRef.current.closeCalendar();
    setClose(false);
  }, [isClose]);

  useEffect(() => {
    setDuration([new DateObject(initPeriod[0]), new DateObject(initPeriod[1])]);
  }, [initPeriod]);

  return (
    <Box>
      <DatePicker
        ref={datePickerRef}
        className="green"
        weekDays={weekDays}
        maxDate={new Date()}
        months={months}
        style={{
          width: '100%',
        }}
        onClose={() => isClose}
        range
        value={duration}
        onChange={(val) => {
          if (val[0] && val[1]) {
            setDuration([val[0], val[1]]);
            // onChange([val[0].toDate(), val[1].toDate()]);
          }
        }}
        plugins={[
          <PeriodInput
            key=""
            position="top"
            initDuration={[duration[0].toDate(), duration[1].toDate()]}
            onChange={(p) => {
              setDuration(p);
            }}
          />,
        ]}
        render={(v, openCalandar) => {
          return (
            <BorderGrayButton
              w="full"
              onClick={openCalandar}
              isDisabled={isDisabled}
              size={size || 'md'}
              borderColor={'gray.400'}
            >
              <HStack w="full">
                <HStack flex={1} justifyContent={'space-around'}>
                  <H4 fontWeight={'bold'}>
                    {dateUtils.formatDateString(duration[0].toDate(), 'D-T')}
                  </H4>
                  <H4 fontWeight={'bold'}>~</H4>
                  <H4 fontWeight={'bold'}>
                    {dateUtils.formatDateString(duration[1].toDate(), 'D-T')}
                  </H4>
                </HStack>
                <Icon as={FaCalendar} />
              </HStack>
            </BorderGrayButton>
          );
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
              if (duration.length == 2) {
                onChange([duration[0].toDate(), duration[1].toDate()]);
              }
              setClose(true);
            }}
            size="sm"
          >
            <H4 fontWeight={'700'}>적용</H4>
          </PrimaryButton>
          <GrayButton
            size="sm"
            onClick={() => {
              setDuration([
                new DateObject(initPeriod[0]),
                new DateObject(initPeriod[1]),
              ]);
              setClose(true);
            }}
          >
            <H4 fontWeight={'700'}>닫기</H4>
          </GrayButton>
        </Flex>
      </DatePicker>
    </Box>
  );
};

export default PeriodSelector;
