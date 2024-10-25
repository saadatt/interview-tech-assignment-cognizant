import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { LinearProgress } from '@mui/material';

import { useIsLoading } from '../selectors';

export function Root() {
  const isLoading = useIsLoading();
  const x = useLoaderData();

  return (
    <Container maxWidth="sm" sx={{ position: 'relative' }}>
      {isLoading && <LinearProgress sx={{ top: -16, left: 0, right: 0, position: 'absolute' }} />}
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </Container>
  );
}
