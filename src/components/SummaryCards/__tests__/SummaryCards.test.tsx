import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SummaryCards from '@/components/SummaryCards/SummaryCards';
import { GenerationData } from '@/types';

const mockGenerationData: GenerationData = {
  country: 'IT',
  date: '2023-12-01',
  generationByType: [
    {
      type: 'Natural Gas',
      displayName: 'Natural Gas',
      value: 18500,
      unit: 'MW',
      isRenewable: false,
      color: '#4ECDC4',
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
      type: 'Solar',
      displayName: 'Solar',
      value: 8900,
      unit: 'MW',
      isRenewable: true,
      color: '#FDCB6E',
    },
  ],
  totalGeneration: 39700,
  renewablePercentage: 53.4,
  topSources: [
    {
      type: 'Natural Gas',
      displayName: 'Natural Gas',
      value: 18500,
      unit: 'MW',
      isRenewable: false,
      color: '#4ECDC4',
    },
    {
      type: 'Hydro',
      displayName: 'Hydro',
      value: 12300,
      unit: 'MW',
      isRenewable: true,
      color: '#96CEB4',
    },
  ],
};

describe('SummaryCards', () => {
  it('renders all summary cards', () => {
    render(<SummaryCards generationData={mockGenerationData} />);

    expect(screen.getByText('Total Generation')).toBeInTheDocument();
    expect(screen.getByText('Renewable Energy')).toBeInTheDocument();
    expect(screen.getByText('Top Source')).toBeInTheDocument();
    expect(screen.getByText('Second Source')).toBeInTheDocument();
  });

  it('displays correct total generation value', () => {
    render(<SummaryCards generationData={mockGenerationData} />);

    expect(screen.getByText('39.7 GW')).toBeInTheDocument();
  });

  it('displays correct renewable percentage', () => {
    render(<SummaryCards generationData={mockGenerationData} />);

    expect(screen.getByText('53.4%')).toBeInTheDocument();
  });

  it('displays top two generation sources', () => {
    render(<SummaryCards generationData={mockGenerationData} />);

    expect(screen.getByText('Natural Gas')).toBeInTheDocument();
    expect(screen.getByText('18.5 GW')).toBeInTheDocument();
    expect(screen.getByText('Hydro')).toBeInTheDocument();
    expect(screen.getByText('12.3 GW')).toBeInTheDocument();
  });

  it('shows loading state when loading prop is true', () => {
    render(<SummaryCards generationData={mockGenerationData} loading />);

    const loadingElements = screen.getAllByText('...');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('handles data with no top sources gracefully', () => {
    const dataWithoutTopSources: GenerationData = {
      ...mockGenerationData,
      topSources: [],
    };

    render(<SummaryCards generationData={dataWithoutTopSources} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles data with only one top source', () => {
    const dataWithOneSource: GenerationData = {
      ...mockGenerationData,
      topSources: [mockGenerationData.topSources[0]],
    };

    render(<SummaryCards generationData={dataWithOneSource} />);

    expect(screen.getByText('Natural Gas')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('has proper test ids for testing', () => {
    render(<SummaryCards generationData={mockGenerationData} />);

    expect(screen.getByTestId('summary-cards')).toBeInTheDocument();
  });

  it('displays proper subtitles for each card', () => {
    render(<SummaryCards generationData={mockGenerationData} />);

    expect(
      screen.getByText('Total electricity generation')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Percentage from renewable sources')
    ).toBeInTheDocument();
  });

  it('formats power values correctly', () => {
    const smallValueData: GenerationData = {
      ...mockGenerationData,
      totalGeneration: 500,
      topSources: [
        {
          type: 'Solar',
          displayName: 'Solar',
          value: 250,
          unit: 'MW',
          isRenewable: true,
          color: '#FDCB6E',
        },
        {
          type: 'Wind',
          displayName: 'Wind',
          value: 150,
          unit: 'MW',
          isRenewable: true,
          color: '#FFEAA7',
        },
      ],
    };

    render(<SummaryCards generationData={smallValueData} />);

    expect(screen.getByText('500 MW')).toBeInTheDocument();
    expect(screen.getByText('250 MW')).toBeInTheDocument();
    expect(screen.getByText('150 MW')).toBeInTheDocument();
  });
});
