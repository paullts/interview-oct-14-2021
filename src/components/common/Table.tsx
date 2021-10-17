import React, { ReactNode } from 'react';
import BootStrapTable from 'react-bootstrap/Table';
import { Loading } from '../../features/loading';

interface ColumnAttributes {
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}
export interface HeaderProps {
  key: string;
  headerName: string;
  attrs?: ColumnAttributes;
}
export interface RowProps {
  id: string;
  value: string | number | JSX.Element | ReactNode;
  attrs?: ColumnAttributes;
}
interface TableProps {
  header: HeaderProps[];
  rows: Array<RowProps[]> | null;
  isLoading?: boolean;
}

const NoData = ({
  colSpan,
  isLoading,
}: {
  colSpan: number;
  isLoading: boolean;
}) => {
  return (
    <tr>
      <td colSpan={colSpan} className='text-center p-4'>
        {isLoading ? <Loading /> : 'No data matching the filter'}
      </td>
    </tr>
  );
};

export default function Table(props: TableProps) {
  const { header, rows, isLoading = false } = props;
  return (
    <BootStrapTable className='table' bordered responsive size='sm'>
      <thead>
        <tr>
          {header.map((h) => (
            <th key={h.key} {...h.attrs}>
              {h.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!rows ? (
          <NoData colSpan={header.length} isLoading={isLoading} />
        ) : (
          rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((col) => (
                <td {...col.attrs} key={col.id}>
                  {col.value}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </BootStrapTable>
  );
}
