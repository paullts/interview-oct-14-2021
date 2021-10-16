import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

interface InputProps {
  withSearchIcon?: boolean;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  const { withSearchIcon, placeholder } = props;

  return (
    <InputGroup className='mb-3'>
      {withSearchIcon && (
        <InputGroup.Text id='basic-addon1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
        </InputGroup.Text>
      )}
      <FormControl
        placeholder={placeholder}
        aria-label='Username'
        aria-describedby='basic-addon1'
      />
    </InputGroup>
  );
}
