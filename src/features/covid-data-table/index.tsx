import React, { memo, useMemo } from 'react';
import { RowProps } from 'react-bootstrap';
import { useAppSelector } from '../../app/hook';
import Table, { HeaderProps } from '../../components/common/Table';
import { v4 as uuidv4 } from 'uuid';
import { AppHelper } from '../../helpers';

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
  const { loading } = useAppSelector((state) => state.loading);

  const rows: Array<RowProps[]> | null = useMemo(() => {
    const dataList = [];
    if (!data.length) return null;

    dataList.push(
      HEADER.map((col) => {
        const totalCaseByStatus = AppHelper.getTotalCaseByStatus(data, col.key);
        return {
          id: uuidv4(),
          value: totalCaseByStatus,
          attrs: { className: 'text-center' },
        };
      })
    );

    return dataList;
  }, [data]);

  // @ts-ignore
  return <Table header={HEADER} rows={rows} isLoading={loading} />;
});

export default DataTable;
