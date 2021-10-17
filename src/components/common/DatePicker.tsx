import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    // set default values when URL have query params
    if (date_from && date_to) {
      onChange([new Date(date_from), new Date(date_to)]);
    }
  }, [date_from, date_to]);

  return (
    <DateRangePicker
      onChange={onDateSelected}
      value={value}
      calendarAriaLabel='Toggle calendar'
      clearAriaLabel='Clear value'
      name={name}
      format='MM/dd/yyyy'
    />
  );
}

export default CustomDateRangePicker;
