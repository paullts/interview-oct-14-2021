import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import CustomDateRangePicker from '../../components/common/DatePicker';
import { dateRangeActions } from './dateRangePickerSlice';
import formatISO from 'date-fns/formatISO';
import { useQueryParams } from '../../hooks/useQueryParams';

export default function CovidDateRangePicker() {
  const query = useQueryParams();

  const dispatch = useAppDispatch();
  const { from, to } = useAppSelector((state) => state.dateRange);

  const handleDateChange = (value: Date[]) => {
    const [from, to] = value
      .map((date) => formatISO(date))
      .map((d) => d.split('+')[0]);
    const dateRange = { from, to };

    dispatch(dateRangeActions.setDate(dateRange));
  };

  useEffect(() => {
    const dateFrom = query.get('date_from');
    const dateTo = query.get('date_to');

    if (dateFrom && dateTo) {
      const dateRange = { from: dateFrom, to: dateTo };

      dispatch(dateRangeActions.setDate(dateRange));
    }

    // FYI: I just want to run this only 1 time when component did mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
