import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { extendedZaphiroTheme } from '../src/theme/zaphiroTheme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1A1F27',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        ThemeProvider,
        { theme: extendedZaphiroTheme },
        React.createElement(CssBaseline),
        React.createElement(
          LocalizationProvider,
          { dateAdapter: AdapterDateFns },
          React.createElement(Story)
        )
      ),
  ],
};

export default preview;
