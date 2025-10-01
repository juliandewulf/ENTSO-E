import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import GenerationChart from './GenerationChart';
import { GenerationType } from '@/types';

const mockGenerationData: GenerationType[] = [
  {
    type: 'Natural Gas',
    displayName: 'Natural Gas',
    value: 18500,
    unit: 'MW',
    isRenewable: false,
    color: '#4ECDC4',
  },
  {
    type: 'Nuclear',
    displayName: 'Nuclear',
    value: 15200,
    unit: 'MW',
    isRenewable: false,
    color: '#FF6B6B',
  },
  {
    type: 'Hydro',
    displayName: 'Hydro',
    value: 12300,
    unit: 'MW',
    isRenewable: true,
    color: '#96CEB4',
  },
  {
    type: 'Wind',
    displayName: 'Wind',
    value: 8900,
    unit: 'MW',
    isRenewable: true,
    color: '#FFEAA7',
  },
  {
    type: 'Solar',
    displayName: 'Solar',
    value: 6200,
    unit: 'MW',
    isRenewable: true,
    color: '#FDCB6E',
  },
  {
    type: 'Coal',
    displayName: 'Coal',
    value: 4100,
    unit: 'MW',
    isRenewable: false,
    color: '#2F2F2F',
  },
];

const meta: Meta<typeof GenerationChart> = {
  title: 'Components/GenerationChart',
  component: GenerationChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A chart component that displays electricity generation data by type. Supports both bar and pie chart visualizations.',
      },
    },
  },
  argTypes: {
    chartType: {
      control: { type: 'radio' },
      options: ['bar', 'pie'],
      description: 'The type of chart to display',
    },
    title: {
      control: 'text',
      description: 'Title displayed above the chart',
    },
    onChartTypeChange: {
      description: 'Callback fired when chart type is changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BarChart: Story = {
  args: {
    generationData: mockGenerationData,
    totalGeneration: 65200,
    title: 'Generation Mix - Italy',
    chartType: 'bar',
    onChartTypeChange: fn(),
  },
};

export const PieChart: Story = {
  args: {
    ...BarChart.args,
    chartType: 'pie',
    title: 'Generation Mix - Pie View',
  },
};

export const WithoutToggle: Story = {
  args: {
    generationData: mockGenerationData,
    totalGeneration: 65200,
    title: 'Static Bar Chart (No Toggle)',
    chartType: 'bar',
    onChartTypeChange: undefined,
  },
};

export const SmallDataset: Story = {
  args: {
    generationData: mockGenerationData.slice(0, 3),
    totalGeneration: 46000,
    title: 'Limited Generation Sources',
    chartType: 'bar',
    onChartTypeChange: fn(),
  },
};

export const RenewableHeavy: Story = {
  args: {
    generationData: [
      {
        type: 'Hydro',
        displayName: 'Hydro',
        value: 25000,
        unit: 'MW',
        isRenewable: true,
        color: '#96CEB4',
      },
      {
        type: 'Wind',
        displayName: 'Wind',
        value: 20000,
        unit: 'MW',
        isRenewable: true,
        color: '#FFEAA7',
      },
      {
        type: 'Solar',
        displayName: 'Solar',
        value: 15000,
        unit: 'MW',
        isRenewable: true,
        color: '#FDCB6E',
      },
      {
        type: 'Natural Gas',
        displayName: 'Natural Gas',
        value: 5000,
        unit: 'MW',
        isRenewable: false,
        color: '#4ECDC4',
      },
    ],
    totalGeneration: 65000,
    title: 'Renewable-Heavy Generation Mix',
    chartType: 'pie',
    onChartTypeChange: fn(),
  },
};

export const EmptyData: Story = {
  args: {
    generationData: [],
    totalGeneration: 0,
    title: 'No Generation Data',
    chartType: 'bar',
    onChartTypeChange: fn(),
  },
};
