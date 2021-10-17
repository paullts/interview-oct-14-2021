import React, { useState } from 'react';
// TODO: fix ts-ignore
//@ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

interface DateRangePickerProps {
  handleChange: (value: Date[]) => void;
  name: string;
  date_from: string;
  date_to: string;
}

function CustomDateRangePicker(props: DateRangePickerProps) {
  const { handleChange, name, date_from, date_to } = props;
  const [value, onChange] = useState([new Date(date_from), new Date(date_to)]);

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
