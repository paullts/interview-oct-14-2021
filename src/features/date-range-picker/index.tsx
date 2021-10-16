import React from 'react';
import { useAppDispatch } from '../../app/hook';
import CustomDateRangePicker from '../../components/common/DatePicker';
import { dateRangeActions } from './dateRangePickerSlice';
import formatISO from 'date-fns/formatISO';

export default function CovidDateRangePicker() {
  const dispatch = useAppDispatch();

  const handleDateChange = (value: Date[]) => {
    const dateStringArray = value.map((v) => formatISO(v));
    const dateRange = { from: dateStringArray[0], to: dateStringArray[1] };

    dispatch(dateRangeActions.setDate(dateRange));
  };
  return <CustomDateRangePicker handleChange={handleDateChange} />;
}
