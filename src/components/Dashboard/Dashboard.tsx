import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  Button,
  Backdrop,
  Typography,
  useTheme,
} from '@mui/material';
import { Refresh, Settings } from '@mui/icons-material';
import { format } from 'date-fns';

import CountrySelector from '@/components/CountrySelector';
import DatePicker from '@/components/DatePicker';
import GenerationChart from '@/components/GenerationChart';
import SummaryCards from '@/components/SummaryCards';
import { useGenerationData } from '@/hooks/useGenerationData';
import { Country, DateString } from '@/types';
import { DEFAULT_COUNTRY } from '@/utils/constants';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(DEFAULT_COUNTRY);
  const [selectedDate, setSelectedDate] = useState<DateString>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const { data, loading, error, refetch } = useGenerationData(
    selectedCountry,
    selectedDate
  );

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleDateChange = (date: DateString) => {
    setSelectedDate(date);
  };

  const handleChartTypeChange = (type: 'bar' | 'pie') => {
    setChartType(type);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <Box>
      {/* Controls Panel */}
      <Paper
        elevation={1}
        sx={{
          p: 4,
          mb: 4,
          backgroundColor: theme.palette.surface.main,
          border: `1px solid ${theme.palette.surface.border}`,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Section header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Settings
            sx={{
              color: theme.palette.accent.main,
              fontSize: 24,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Data Controls
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              disabled={loading}
              label="Select Date"
              maxDate={new Date()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRetry}
              disabled={loading}
              fullWidth
              sx={{
                borderColor: theme.palette.accent.main,
                color: theme.palette.accent.main,
                '&:hover': {
                  borderColor: theme.palette.accent.light,
                  backgroundColor: `${theme.palette.accent.main}10`,
                },
                py: 1.5,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Refresh Data
            </Button>
          </Grid>
        </Grid>

        {/* Accent line */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${theme.palette.accent.main} 0%, transparent 100%)`,
          }}
        />
      </Paper>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{
          color: theme.palette.accent.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: `${theme.palette.background.default}CC`,
          backdropFilter: 'blur(4px)',
        }}
        open={loading}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress
            size={48}
            sx={{
              color: theme.palette.accent.main,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Loading Data...
          </Typography>
        </Box>
      </Backdrop>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 4,
            backgroundColor: `${theme.palette.error.main}10`,
            border: `1px solid ${theme.palette.error.main}40`,
            borderRadius: 2,
            '& .MuiAlert-icon': {
              color: theme.palette.error.main,
            },
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleRetry}
              sx={{
                color: theme.palette.error.main,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Retry
            </Button>
          }
        >
          <AlertTitle
            sx={{
              color: theme.palette.error.main,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Error Loading Data
          </AlertTitle>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary }}
          >
            {error.message}
          </Typography>
          {error.details && (
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: 'block',
                color: theme.palette.text.secondary,
                fontFamily: 'monospace',
              }}
            >
              {error.details}
            </Typography>
          )}
        </Alert>
      )}

      {/* Content */}
      {data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Summary Cards */}
          <SummaryCards generationData={data} loading={loading} />

          {/* Generation Chart */}
          <GenerationChart
            generationData={data.generationByType}
            totalGeneration={data.totalGeneration}
            title={`Generation Mix - ${selectedCountry.name} (${selectedDate})`}
            chartType={chartType}
            onChartTypeChange={handleChartTypeChange}
          />
        </Box>
      )}

      {/* No Data State */}
      {!loading && !error && !data && (
        <Paper
          elevation={1}
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: theme.palette.surface.main,
            border: `1px solid ${theme.palette.surface.border}`,
            borderRadius: 2,
          }}
        >
          <Alert
            severity="info"
            sx={{
              backgroundColor: `${theme.palette.info.main}10`,
              border: `1px solid ${theme.palette.info.main}40`,
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: theme.palette.info.main,
              },
            }}
          >
            <AlertTitle
              sx={{
                color: theme.palette.info.main,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              No Data Available
            </AlertTitle>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              Please select a country and date to view generation data.
            </Typography>
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard;
