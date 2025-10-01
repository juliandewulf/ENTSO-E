import { createTheme, ThemeOptions } from '@mui/material/styles';

// Zaphiro Color Palette
export const zaphiroColors = {
  // Primary Accent / Highlight
  turboYellow: '#ECF100',
  turboYellowLight: '#F4F533',
  turboYellowDark: '#D6DC00',

  // Dark Background / Base - Much darker for modern look
  charcoal: '#0A0B0D',
  charcoalLight: '#131419',
  charcoalDark: '#050507',

  // Surface / Text Light
  white: '#FFFFFF',
  offWhite: '#F5F5F5',
  lightGray: '#E8E9EA',

  // Secondary Accent / Interactive
  cyan: '#00BFFF',
  cyanLight: '#33CCFF',
  cyanDark: '#0099CC',

  // Neutral / Gray for UI elements
  midGray: '#8A9299',
  darkGray: '#5C6267',
  borderGray: '#1A1D21',

  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    surface: {
      main: string;
      elevated: string;
      border: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    surface?: {
      main: string;
      elevated: string;
      border: string;
    };
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',

    // Primary - Turbo Yellow for highlights and main accents
    primary: {
      main: zaphiroColors.turboYellow,
      light: zaphiroColors.turboYellowLight,
      dark: zaphiroColors.turboYellowDark,
      contrastText: zaphiroColors.charcoal,
    },

    // Secondary - Cyan for interactive elements
    secondary: {
      main: zaphiroColors.cyan,
      light: zaphiroColors.cyanLight,
      dark: zaphiroColors.cyanDark,
      contrastText: zaphiroColors.white,
    },

    // Custom accent color
    accent: {
      main: zaphiroColors.turboYellow,
      light: zaphiroColors.turboYellowLight,
      dark: zaphiroColors.turboYellowDark,
      contrastText: zaphiroColors.white,
    },

    // Surface colors for cards and elevated content
    surface: {
      main: zaphiroColors.charcoalLight,
      elevated: '#1A1D23',
      border: zaphiroColors.borderGray,
    },

    // Background colors
    background: {
      default: zaphiroColors.charcoal,
      paper: zaphiroColors.charcoalLight,
    },

    // Text colors
    text: {
      primary: zaphiroColors.white,
      secondary: zaphiroColors.midGray,
      disabled: zaphiroColors.darkGray,
    },

    // Divider
    divider: zaphiroColors.borderGray,

    // Status colors
    success: {
      main: zaphiroColors.success,
      light: '#66BB6A',
      dark: '#388E3C',
      contrastText: zaphiroColors.white,
    },
    warning: {
      main: zaphiroColors.warning,
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: zaphiroColors.charcoal,
    },
    error: {
      main: zaphiroColors.error,
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: zaphiroColors.white,
    },
    info: {
      main: zaphiroColors.info,
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: zaphiroColors.white,
    },
  },

  typography: {
    fontFamily:
      '"Inter", "IBM Plex Sans", "Roboto", "Helvetica", "Arial", sans-serif',

    // Display typography
    h1: {
      fontSize: '3.5rem',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },

    // Body typography
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },

    // UI typography
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.03em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },

  spacing: 8, // 8px base spacing unit

  shape: {
    borderRadius: 8, // Consistent border radius
  },

  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.6)',
    '0px 2px 6px rgba(0, 0, 0, 0.5)',
    '0px 4px 12px rgba(0, 0, 0, 0.4)',
    '0px 6px 18px rgba(0, 0, 0, 0.35)',
    '0px 8px 24px rgba(0, 0, 0, 0.3)',
    '0px 12px 36px rgba(0, 0, 0, 0.25)',
    '0px 16px 48px rgba(0, 0, 0, 0.2)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
    '0px 24px 60px rgba(0, 0, 0, 0.15)',
  ],
};

export const zaphiroTheme = createTheme(themeOptions);

// Extend theme with component customizations
export const extendedZaphiroTheme = createTheme(zaphiroTheme, {
  components: {
    // Paper component styling
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default gradient
          border: `1px solid ${zaphiroColors.borderGray}`,
        },
        elevation1: {
          boxShadow: `0px 1px 3px rgba(0, 0, 0, 0.6), 0px 0px 0px 1px ${zaphiroColors.borderGray}`,
        },
        elevation2: {
          boxShadow: `0px 2px 6px rgba(0, 0, 0, 0.5), 0px 0px 0px 1px ${zaphiroColors.borderGray}`,
        },
      },
    },

    // Button styling
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0px 2px 8px rgba(0, 191, 255, 0.3)`,
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },

    // Card styling
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${zaphiroColors.borderGray}`,
          '&:hover': {
            borderColor: zaphiroColors.cyan,
            boxShadow: `0px 4px 12px rgba(0, 191, 255, 0.1)`,
          },
        },
      },
    },

    // TextField styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: zaphiroColors.borderGray,
            },
            '&:hover fieldset': {
              borderColor: zaphiroColors.midGray,
            },
            '&.Mui-focused fieldset': {
              borderColor: zaphiroColors.cyan,
              borderWidth: '2px',
            },
          },
        },
      },
    },

    // Select styling
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: zaphiroColors.cyan,
            borderWidth: '2px',
          },
        },
      },
    },

    // Alert styling
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1px solid ${zaphiroColors.borderGray}`,
        },
        standardError: {
          backgroundColor: `${zaphiroColors.error}15`,
          borderColor: zaphiroColors.error,
        },
        standardWarning: {
          backgroundColor: `${zaphiroColors.warning}15`,
          borderColor: zaphiroColors.warning,
        },
        standardInfo: {
          backgroundColor: `${zaphiroColors.cyan}15`,
          borderColor: zaphiroColors.cyan,
        },
        standardSuccess: {
          backgroundColor: `${zaphiroColors.success}15`,
          borderColor: zaphiroColors.success,
        },
      },
    },

    // Chip styling
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        outlined: {
          borderWidth: '2px',
        },
      },
    },

    // CircularProgress styling
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: zaphiroColors.cyan,
        },
      },
    },
  },
});

export default extendedZaphiroTheme;
