import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import CustomDateRangePicker from '../../components/common/DatePicker';
import { dateRangeActions } from './dateRangePickerSlice';
import formatISO from 'date-fns/formatISO';

export default function CovidDateRangePicker() {
  const dispatch = useAppDispatch();
  const { from, to } = useAppSelector((state) => state.dateRange);

  const handleDateChange = (value: Date[]) => {
    const dateStringArray = value.map((v) => formatISO(v));
    const dateRange = { from: dateStringArray[0], to: dateStringArray[1] };

    dispatch(dateRangeActions.setDate(dateRange));
  };

  return (
    <React.Fragment>
      <label htmlFor={'date-range'}>
        Select date range
        <CustomDateRangePicker
          handleChange={handleDateChange}
          name='date-range'
          date_from={from}
          date_to={to}
        />
      </label>
    </React.Fragment>
  );
}
