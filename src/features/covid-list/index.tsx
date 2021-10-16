import React from 'react';
import { Card } from 'react-bootstrap';

interface ListItem {
  title: string;
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
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {list.length && (
          <ul>
            {list.map((item) => (
              <li key={item.title} className={item.className}>
                {item.title}: {item.value}
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
}
