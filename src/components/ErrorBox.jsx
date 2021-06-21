import React from 'react';
import { Link } from 'wouter';
import { Box, Button, Heading } from 'react-bulma-components';

function ErrorBox ({message}) {
  return (
    <Box>
      <Heading size="4">Something went wrong</Heading>
      <p>{message}</p>
      <div style={{marginTop: 6, display: 'flex', gap: 6}}>
        <Button color="primary" onClick={() => window.location.reload()}>Reload</Button>
        <Button color="info" renderAs={Link} href="/">Home page</Button>        
      </div>
    </Box>
  );
}

export default ErrorBox;
