import React, { useState } from 'react';
// TODO: fix ts-ignore
//@ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useAppSelector } from '../../app/hook';

interface DateRangePickerProps {
  handleChange: (value: Date[]) => void;
  name: string;
}

function CustomDateRangePicker(props: DateRangePickerProps) {
  const { handleChange, name } = props;
  const { from, to } = useAppSelector((state) => state.dateRange);
  const [value, onChange] = useState([new Date(from), new Date(to)]);

  const onDateSelected = (value: Date[]) => {
    handleChange(value);
    onChange(value);
  };

  return (
    <DateRangePicker
      onChange={onDateSelected}
      value={value}
      calendarAriaLabel='Toggle calendar'
      clearAriaLabel='Clear value'
      name={name}
    />
  );
}

export default CustomDateRangePicker;
