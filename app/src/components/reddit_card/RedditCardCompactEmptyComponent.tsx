import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import React from 'react';

function RedditCardCompactEmptyComponent(): JSX.Element {
  return (
    <Card variant="outlined" sx={{ maxWidth: { xs: '100%' } }}>
      <CardHeader
        title={<Skeleton variant="rectangular" width={'100%'} height={30} />}
        subheader={
          <Skeleton variant="rectangular" width={'100%'} height={15} />
        }
      />
      <CardContent>
        <Skeleton variant="rectangular" width={'100%'} height={100} />
      </CardContent>
    </Card>
  );
}

export default RedditCardCompactEmptyComponent;
