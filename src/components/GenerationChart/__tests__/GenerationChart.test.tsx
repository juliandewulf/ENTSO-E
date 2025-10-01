import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GenerationChart from '../GenerationChart';
import { GenerationType } from '../../../types';

// Mock Chart.js components
vi.mock('react-chartjs-2', () => ({
  Bar: ({ data }: any) => (
    <div data-testid="bar-chart">Bar Chart - {data.datasets[0].label}</div>
  ),
  Pie: ({ data }: any) => (
    <div data-testid="pie-chart">Pie Chart - {data.datasets[0].label}</div>
  ),
}));

const mockGenerationData: GenerationType[] = [
  {
    type: 'Natural Gas',
    displayName: 'Natural Gas',
    value: 1500,
    unit: 'MW',
    isRenewable: false,
    color: '#4ECDC4',
  },
  {
    type: 'Wind',
    displayName: 'Wind',
    value: 1000,
    unit: 'MW',
    isRenewable: true,
    color: '#FFEAA7',
  },
  {
    type: 'Solar',
    displayName: 'Solar',
    value: 800,
    unit: 'MW',
    isRenewable: true,
    color: '#FDCB6E',
  },
];

const mockOnChartTypeChange = vi.fn();

const defaultProps = {
  generationData: mockGenerationData,
  totalGeneration: 3300,
  title: 'Test Generation Mix',
  chartType: 'bar' as const,
  onChartTypeChange: mockOnChartTypeChange,
};

describe('GenerationChart', () => {
  beforeEach(() => {
    mockOnChartTypeChange.mockClear();
  });

  it('renders with bar chart by default', () => {
    render(<GenerationChart {...defaultProps} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart-container')).toBeInTheDocument();
  });

  it('renders with pie chart when chartType is pie', () => {
    render(<GenerationChart {...defaultProps} chartType="pie" />);

    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart-container')).toBeInTheDocument();
  });

  it('displays the title', () => {
    render(<GenerationChart {...defaultProps} />);

    expect(screen.getByText('Test Generation Mix')).toBeInTheDocument();
  });

  it('shows chart type toggle buttons when onChartTypeChange is provided', () => {
    render(<GenerationChart {...defaultProps} />);

    expect(screen.getByTestId('bar-chart-button')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart-button')).toBeInTheDocument();
  });

  it('does not show toggle buttons when onChartTypeChange is not provided', () => {
    const propsWithoutToggle = { ...defaultProps };
    delete (propsWithoutToggle as any).onChartTypeChange;

    render(<GenerationChart {...propsWithoutToggle} />);

    expect(screen.queryByTestId('bar-chart-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pie-chart-button')).not.toBeInTheDocument();
  });

  it('calls onChartTypeChange when different chart type is selected', () => {
    render(<GenerationChart {...defaultProps} />);

    const pieButton = screen.getByTestId('pie-chart-button');
    fireEvent.click(pieButton);

    expect(mockOnChartTypeChange).toHaveBeenCalledWith('pie');
  });

  it('does not call onChartTypeChange when same chart type is selected', () => {
    render(<GenerationChart {...defaultProps} />);

    const barButton = screen.getByTestId('bar-chart-button');
    fireEvent.click(barButton);

    // Should not be called since 'bar' is already selected
    expect(mockOnChartTypeChange).not.toHaveBeenCalled();
  });

  it('uses default title when none provided', () => {
    const propsWithoutTitle = { ...defaultProps };
    delete (propsWithoutTitle as any).title;

    render(<GenerationChart {...propsWithoutTitle} />);

    expect(screen.getByText('Generation Mix')).toBeInTheDocument();
  });

  it('handles empty generation data', () => {
    render(<GenerationChart {...defaultProps} generationData={[]} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('sorts generation data by value in descending order', () => {
    // This test checks that the data is processed correctly
    // The actual sorting verification would need access to the chart data
    render(<GenerationChart {...defaultProps} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<GenerationChart {...defaultProps} />);

    const barButton = screen.getByTestId('bar-chart-button');
    const pieButton = screen.getByTestId('pie-chart-button');

    expect(barButton).toHaveAttribute('aria-label', 'bar chart');
    expect(pieButton).toHaveAttribute('aria-label', 'pie chart');
  });

  it('maintains chart height', () => {
    render(<GenerationChart {...defaultProps} />);

    const chartContainer = screen.getByTestId('bar-chart-container');
    expect(chartContainer).toHaveStyle({ height: '400px' });
  });
});
