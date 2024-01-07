import { Container, colors } from '@mui/material';
import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { Outlet } from 'react-router-dom';
import { useGetAccessTokenQuery } from '../reddit/RedditService';

function RootComponent(): JSX.Element {
  // const { data, isLoading, isError } = useGetAccessTokenQuery();
  return (
    <>
      <HeaderComponent />
      <Container sx={{ bgcolor: colors.grey[100] }} maxWidth="xl">
        <Outlet />
      </Container>
      <FooterComponent />
    </>
  );
}

export default RootComponent;
