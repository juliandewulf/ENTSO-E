import type { Meta, StoryObj } from '@storybook/react';
import { ElectricBolt, Recycling, TrendingUp, Warning } from '@mui/icons-material';
import SummaryCard from './SummaryCard';

const meta: Meta<typeof SummaryCard> = {
  title: 'Components/SummaryCard',
  component: SummaryCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A card component that displays summary information with optional icons, trends, and additional details.',
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Theme color for the card',
    },
    icon: {
      control: false,
      description: 'Material-UI icon component',
    },
    trend: {
      control: 'object',
      description: 'Trend information with value and direction',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TotalGeneration: Story = {
  args: {
    title: 'Total Generation',
    value: '45.2 GW',
    subtitle: 'Total electricity generation',
    icon: ElectricBolt,
    color: 'primary',
  },
};

export const RenewablePercentage: Story = {
  args: {
    title: 'Renewable Energy',
    value: '65.3%',
    subtitle: 'Percentage from renewable sources',
    icon: Recycling,
    color: 'success',
    trend: {
      value: 12.5,
      isPositive: true,
    },
  },
};

export const TopSource: Story = {
  args: {
    title: 'Top Source',
    value: 'Wind',
    subtitle: '18.5 GW',
    icon: TrendingUp,
    color: 'info',
    additionalInfo: ['Capacity factor: 42%', 'Peak output: 22.1 GW'],
  },
};

export const WithNegativeTrend: Story = {
  args: {
    title: 'Fossil Fuels',
    value: '34.7%',
    subtitle: 'Non-renewable generation',
    icon: Warning,
    color: 'warning',
    trend: {
      value: -8.2,
      isPositive: false,
    },
  },
};

export const LargeNumber: Story = {
  args: {
    title: 'Annual Generation',
    value: '2,450 TWh',
    subtitle: 'Total yearly output',
    icon: ElectricBolt,
    color: 'secondary',
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Connection Status',
    value: 'Offline',
    subtitle: 'Unable to fetch data',
    icon: Warning,
    color: 'error',
    additionalInfo: ['Last update: 2 hours ago', 'Retrying connection...'],
  },
};

export const MinimalCard: Story = {
  args: {
    title: 'Simple Metric',
    value: '42',
  },
};

export const WithAdditionalInfo: Story = {
  args: {
    title: 'Grid Frequency',
    value: '50.02 Hz',
    subtitle: 'Current frequency',
    color: 'info',
    additionalInfo: [
      'Target: 50.00 Hz',
      'Variance: +0.02 Hz',
      'Status: Normal',
    ],
  },
};
