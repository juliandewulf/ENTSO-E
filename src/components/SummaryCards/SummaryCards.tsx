import React from 'react';
import { Grid, Box, Typography, useTheme } from '@mui/material';
import {
  ElectricBolt,
  Bolt,
  TrendingUp,
  EmojiObjects,
  Analytics,
} from '@mui/icons-material';
import SummaryCard from './SummaryCard';
import { GenerationData } from '../../types';
import { formatPowerValue } from '../../utils/dataProcessing';

interface SummaryCardsProps {
  generationData: GenerationData;
  loading?: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  generationData,
  loading = false,
}) => {
  const theme = useTheme();
  const { totalGeneration, renewablePercentage, topSources } = generationData;

  const topTwoSources = topSources.slice(0, 2);

  const summaryData = [
    {
      title: 'Total Generation',
      value: loading ? '...' : formatPowerValue(totalGeneration),
      subtitle: `Total electricity generation`,
      icon: ElectricBolt,
      color: 'primary' as const,
    },
    {
      title: 'Renewable Energy',
      value: loading ? '...' : `${renewablePercentage.toFixed(1)}%`,
      subtitle: 'Percentage from renewable sources',
      icon: Bolt,
      color: 'success' as const,
    },
    {
      title: 'Top Source',
      value: loading ? '...' : topTwoSources[0]?.displayName || 'N/A',
      subtitle: loading
        ? '...'
        : `${formatPowerValue(topTwoSources[0]?.value || 0)}`,
      icon: TrendingUp,
      color: 'secondary' as const,
    },
    {
      title: 'Second Source',
      value: loading ? '...' : topTwoSources[1]?.displayName || 'N/A',
      subtitle: loading
        ? '...'
        : `${formatPowerValue(topTwoSources[1]?.value || 0)}`,
      icon: EmojiObjects,
      color: 'warning' as const,
    },
  ];

  return (
    <Box data-testid="summary-cards">
      {/* Section Header */}
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
        <Analytics
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
          Generation Overview
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {summaryData.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <SummaryCard
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
              color={card.color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SummaryCards;
