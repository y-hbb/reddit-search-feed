import { useRouteError } from 'react-router-dom';
import React from 'react';
import { Container } from '@mui/material';

export default function ErrorPageComponent(): JSX.Element {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Container sx={{ textAlign: 'center' }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}
