import { Card, CardHeader, CardMedia } from '@mui/material';
import React from 'react';
import { PostSubHeader, PostTitle } from './RedditCardCommonComponents';

interface RedditCardCompactComponentProps {
  data: any;
}
function RedditCardCompactComponent(
  props: RedditCardCompactComponentProps
): JSX.Element {
  const title = <PostTitle data={props.data} />;
  const subheader = <PostSubHeader data={props.data} />;

  function validURL(str: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: { xs: '100%' }, display: 'flex' }}>
      {props.data?.thumbnail && validURL(props.data?.thumbnail) && (
        <CardMedia
          component="img"
          src={props.data?.thumbnail}
          sx={{
            width: props.data?.thumbnail_width,
            height: props.data?.thumbnail_height,
          }}
        />
      )}
      <CardHeader title={title} subheader={subheader} />
    </Card>
  );
}

export default RedditCardCompactComponent;
