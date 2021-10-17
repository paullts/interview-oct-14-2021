import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useAppSelector } from '../../app/hook';

interface LoadingProps {
  className?: string;
}

function Loading(props: LoadingProps) {
  const { className } = props;
  const { loading, isOverlayFullScreen } = useAppSelector(
    (state) => state.loading
  );
  console.log(loading);

  if (!loading) return null;

  if (loading && !isOverlayFullScreen) {
    return (
      <Spinner
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      <Spinner
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
      />
    </div>
  );
}

export { Loading };
