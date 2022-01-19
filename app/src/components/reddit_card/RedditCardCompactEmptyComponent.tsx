import { Card, CardHeader } from '@mui/material';
import React from 'react';

function RedditCardCompactEmptyComponent() {

    return (
        <Card sx={{ maxWidth: { xs: '100%' }, display: 'flex' }}>
            <CardHeader title={'Loading...'} subheader={'loading...'} />
        </Card>
    )
}

export default RedditCardCompactEmptyComponent
