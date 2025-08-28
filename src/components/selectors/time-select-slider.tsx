import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const TimeSelectSlider = ({
  value,
  onChange,
}: {
  value: number[];
  onChange: (value: number[]) => void;
}) => {
  const [innerValue, setInnerValue] = useState<number[]>([0, 24]);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <RangeSlider
      w={'full'}
      min={0}
      max={24}
      step={1}
      onChange={(val) => {
        setInnerValue(val as [number, number]);
        onChange(val);
      }}
      defaultValue={value}
      value={innerValue}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack bg={'primary.400'} />
      </RangeSliderTrack>
      <RangeSliderThumb bg="primary.200" index={0}></RangeSliderThumb>
      <RangeSliderThumb bg="primary.200" index={1}></RangeSliderThumb>
    </RangeSlider>
  );
};
export default TimeSelectSlider;
