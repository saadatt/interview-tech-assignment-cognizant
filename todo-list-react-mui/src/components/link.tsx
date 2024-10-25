import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

export const Link = (props: RouterLinkProps & MuiLinkProps) => {
  return <MuiLink component={RouterLink} {...props} />;
}