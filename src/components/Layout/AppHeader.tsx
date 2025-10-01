import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ElectricBolt } from '@mui/icons-material';

const AppHeader: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        py: 4,
        px: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid pattern background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(${theme.palette.accent.main} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.palette.accent.main} 1px, transparent 1px)
          `,
          backgroundSize: '60px 40px',
        }}
      />

      {/* Accent line */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.accent.main} 100%)`,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Logo/Icon */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.accent.main}20)`,
            border: `1px solid ${theme.palette.accent.main}40`,
            mb: 3,
          }}
        >
          <ElectricBolt
            sx={{
              fontSize: 24,
              color: theme.palette.primary.main,
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.accent.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 300,
            letterSpacing: '-0.02em',
          }}
        >
          ENTSO-E Generation Dashboard
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 600,
            margin: '0 auto',
            fontSize: '1.125rem',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          Real-time electricity generation data across Europe
        </Typography>

        {/* Status indicator */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mt: 3,
            px: 2,
            py: 1,
            borderRadius: 1,
            backgroundColor: `${theme.palette.success.main}15`,
            border: `1px solid ${theme.palette.success.main}40`,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: theme.palette.success.main,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.5 },
                '100%': { opacity: 1 },
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.success.main,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Live Data
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AppHeader;
