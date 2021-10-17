import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import CustomDateRangePicker from '../DatePicker';

describe('renders <Table /> with header and empty rows', () => {
  let renderResult: any;
  const handleChange = jest.fn();
  beforeEach(() => {
    renderResult = render(
      <CustomDateRangePicker
        name='test-daterange-picker'
        date_from='2021-10-01T00:00:00'
        date_to='2021-10-03T23:59:59'
        handleChange={handleChange}
      />
    );
  });
  afterEach(cleanup);

  it('should match the snapshot', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should display `10/01/2021` and `10/03/2021`', () => {
    expect(screen.getByDisplayValue(/2021-10-01/i)).toBeTruthy();
    expect(screen.getByDisplayValue(/2021-10-03/i)).toBeTruthy();
  });
});
