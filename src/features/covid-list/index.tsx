import React from 'react';
import { Card } from 'react-bootstrap';

export interface ListItem {
  label: string;
  value: string | number;
  className?: string;
}
interface CustomTableProps {
  list: ListItem[];
  title: string;
}

export default function CovidList(props: CustomTableProps) {
  const { list, title } = props;
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {list.length && (
          <ul>
            {list.map((item) => (
              <li key={item.label} className={item.className}>
                {item.label}: {item.value}
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
}
