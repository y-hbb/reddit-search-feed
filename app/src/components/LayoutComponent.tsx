import { Container, colors } from '@mui/material';
import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';

interface LayoutComponentProps {
  children: React.ReactNode;
}

function LayoutComponent(props: LayoutComponentProps): JSX.Element {
  return (
    <>
      <HeaderComponent />
      <Container sx={{ bgcolor: colors.grey[100] }} maxWidth="xl">
        {props.children}
      </Container>
      <FooterComponent />
    </>
  );
}

export default LayoutComponent;
