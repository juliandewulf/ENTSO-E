import { Box, Container, useTheme } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AppHeader } from './components/Layout';

function App() {
  const theme = useTheme();

  return (
    <ErrorBoundary>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid pattern */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.02,
            backgroundImage: `
              linear-gradient(${theme.palette.divider} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Main content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <AppHeader />

          <Container
            maxWidth="xl"
            sx={{
              py: 6,
              px: { xs: 2, md: 4 },
            }}
          >
            <Dashboard />
          </Container>
        </Box>

        {/* Subtle accent glow */}
        <Box
          sx={{
            position: 'fixed',
            top: '-50%',
            right: '-20%',
            width: '40%',
            height: '100%',
            background: `radial-gradient(ellipse, ${theme.palette.accent.main}05 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </Box>
    </ErrorBoundary>
  );
}

export default App;
