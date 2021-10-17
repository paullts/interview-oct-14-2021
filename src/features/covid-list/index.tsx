import React, { memo, useMemo } from 'react';
import { RowProps } from 'react-bootstrap';
import { useAppSelector } from '../../app/hook';
import Table, { HeaderProps } from '../../components/common/Table';
import { v4 as uuidv4 } from 'uuid';
import { AppHelper } from '../../helpers';

const { isObjectEmpty } = AppHelper;

const HEADER: HeaderProps[] = [
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

const DataTable = memo(() => {
  const { data } = useAppSelector((state) => state.covidData);

  const rows: Array<RowProps[]> | null = useMemo(() => {
    const dataList = [];
    if (isObjectEmpty(data)) return null;

    dataList.push(
      HEADER.map((col) => ({
        id: uuidv4(),
        // @ts-ignore
        value: data[col.key],
        attrs: { className: 'text-center' },
      }))
    );

    return dataList;
  }, [data]);

  // @ts-ignore
  return <Table header={HEADER} rows={rows} />;
});

export default DataTable;
