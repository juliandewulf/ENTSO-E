import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { extendedZaphiroTheme } from '../theme/zaphiroTheme';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={extendedZaphiroTheme}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };