import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Paper,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import { BarChart, PieChart, ShowChart } from '@mui/icons-material';
import { GenerationType } from '@/types';
import {
  formatPowerValue,
  calculatePercentage,
} from '@/utils/dataProcessing';
import { zaphiroColors } from '@/theme/zaphiroTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface GenerationChartProps {
  generationData: GenerationType[];
  totalGeneration: number;
  title?: string;
  chartType?: 'bar' | 'pie';
  onChartTypeChange?: (type: 'bar' | 'pie') => void;
}

const GenerationChart: React.FC<GenerationChartProps> = ({
  generationData,
  totalGeneration,
  title = 'Generation Mix',
  chartType = 'bar',
  onChartTypeChange,
}) => {
  const theme = useTheme();

  const chartData = useMemo(() => {
    const sortedData = [...generationData].sort((a, b) => b.value - a.value);

    // Enhanced color palette for dark theme
    const enhancedColors = sortedData.map((item, index) => {
      // Use Zaphiro colors for better contrast on dark background
      const colorPalette = [
        zaphiroColors.turboYellow,
        zaphiroColors.cyan,
        zaphiroColors.success,
        zaphiroColors.warning,
        zaphiroColors.info,
        zaphiroColors.error,
        zaphiroColors.midGray,
        '#9C27B0', // Purple
        '#FF5722', // Deep Orange
        '#795548', // Brown
      ];
      return item.color || colorPalette[index % colorPalette.length];
    });

    return {
      labels: sortedData.map((item) => item.displayName),
      datasets: [
        {
          label: 'Generation (MW)',
          data: sortedData.map((item) => item.value),
          backgroundColor: enhancedColors.map((color) => `${color}CC`), // Add transparency
          borderColor: enhancedColors,
          borderWidth: 2,
          hoverBackgroundColor: enhancedColors,
          hoverBorderColor: enhancedColors,
          hoverBorderWidth: 3,
        },
      ],
    };
  }, [generationData]);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false, // We'll handle title externally
      },
      tooltip: {
        backgroundColor: theme.palette.surface.elevated,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.accent.main,
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            const percentage = calculatePercentage(value, totalGeneration);
            return `${formatPowerValue(value)} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: `${theme.palette.divider}40`,
          drawOnChartArea: true,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 12,
            weight: 500,
          },
          maxRotation: 45,
        },
        border: {
          color: theme.palette.divider,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: `${theme.palette.divider}40`,
          drawOnChartArea: true,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 12,
            weight: 500,
          },
          callback: (value: any) => formatPowerValue(Number(value)),
        },
        border: {
          color: theme.palette.divider,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 13,
            weight: 500,
          },
        },
      },
      title: {
        display: false, // We'll handle title externally
      },
      tooltip: {
        backgroundColor: theme.palette.surface.elevated,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.accent.main,
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            const percentage = calculatePercentage(value, totalGeneration);
            return `${context.label}: ${formatPowerValue(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  const handleChartTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: 'bar' | 'pie' | null
  ) => {
    if (newType && onChartTypeChange) {
      onChartTypeChange(newType);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        backgroundColor: theme.palette.surface.main,
        border: `1px solid ${theme.palette.surface.border}`,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ShowChart
            sx={{
              color: theme.palette.accent.main,
              fontSize: 24,
            }}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </Typography>
        </Box>

        {onChartTypeChange && (
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="chart type"
            size="small"
            sx={{
              backgroundColor: theme.palette.surface.elevated,
              border: `1px solid ${theme.palette.surface.border}`,
              borderRadius: 1.5,
              '& .MuiToggleButton-root': {
                color: theme.palette.text.secondary,
                border: 'none',
                borderRadius: '6px !important',
                px: 2,
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.accent.main,
                  color: theme.palette.background.default,
                  '&:hover': {
                    backgroundColor: theme.palette.accent.dark,
                  },
                },
                '&:hover': {
                  backgroundColor: `${theme.palette.accent.main}20`,
                },
              },
            }}
          >
            <ToggleButton
              value="bar"
              aria-label="bar chart"
              data-testid="bar-chart-button"
            >
              <BarChart sx={{ fontSize: 18 }} />
            </ToggleButton>
            <ToggleButton
              value="pie"
              aria-label="pie chart"
              data-testid="pie-chart-button"
            >
              <PieChart sx={{ fontSize: 18 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      {/* Chart Container */}
      <Box
        height={450}
        data-testid={`${chartType}-chart-container`}
        sx={{
          position: 'relative',
          '& canvas': {
            borderRadius: 1,
          },
        }}
      >
        {chartType === 'bar' ? (
          <Bar data={chartData} options={barOptions} />
        ) : (
          <Pie data={chartData} options={pieOptions} />
        )}
      </Box>

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
  );
};

export default GenerationChart;
