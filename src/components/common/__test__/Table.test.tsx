import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Table, { HeaderProps, RowProps } from '../Table';

const header: HeaderProps[] = [
  {
    key: 'Confirmed',
    headerName: 'total confirmed',
    attrs: { className: 'text-center text-capitalize' },
  },
  {
    key: 'Deaths',
    headerName: 'total deaths',
    attrs: { className: 'text-center text-capitalize' },
  },
  {
    key: 'Recovered',
    headerName: 'total recovered',
    attrs: { className: 'text-center text-capitalize' },
  },
];

const rows: Array<RowProps[]> = [
  [
    { id: '123', value: '100', attrs: { className: 'text-center' } },
    {
      id: 'random-uuid',
      value: '20',
      attrs: { className: 'text-center' },
    },
    {
      id: 'random-uuid-2',
      value: '30',
      attrs: { className: 'text-center' },
    },
  ],
];

describe('renders <Table /> with header and empty rows', () => {
  let renderResult: any;
  beforeEach(() => {
    renderResult = render(<Table header={header} rows={null} />);
  });
  afterEach(cleanup);

  it('should match the snapshot', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should render header cols', () => {
    expect(screen.getByText(/total confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/total deaths/i)).toBeInTheDocument();
    expect(screen.getByText(/total recovered/i)).toBeInTheDocument();
  });

  it('should render NoData', () => {
    expect(
      screen.getByText(/No data matching the filter/i)
    ).toBeInTheDocument();
  });
});

describe('renders <Table /> with specific header and rows', () => {
  beforeEach(() => {
    render(<Table header={header} rows={rows} />);
  });
  afterEach(cleanup);

  it('should render header cols', () => {
    expect(screen.queryByText('No data matching the filter')).toBeNull();
    expect(screen.getByText(/total confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/total deaths/i)).toBeInTheDocument();
    expect(screen.getByText(/total recovered/i)).toBeInTheDocument();
  });
});
