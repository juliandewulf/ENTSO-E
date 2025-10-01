# ENTSO-E Electricity Generation Dashboard

A React TypeScript dashboard that visualizes electricity generation data from the ENTSO-E Transparency Platform. The application displays real-time electricity generation by type for European countries with interactive charts and summary statistics.

![Dashboard Preview](https://entso-e.juliandewulf.com/)

## Features

- 🌍 **Country Selection**: View data for different countries
- 📅 **Date Selection**: Choose any date to view historical generation data
- 📊 **Interactive Charts**: Switch between bar and pie chart visualizations
- 📈 **Summary Cards**: Quick overview of total generation, renewable percentage, and top sources
- 🔄 **Real-time Updates**: Refresh data with a single click
- 🎨 **Material-UI Design**: Clean, responsive interface
- ⚡ **Error Handling**: Graceful error states with retry functionality
- 🧪 **Comprehensive Testing**: Unit and component tests with high coverage
- 📚 **Storybook Documentation**: Interactive component documentation

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Documentation**: Storybook
- **Containerization**: Docker

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm
- Docker (optional, for containerized development and deployment)

### 1. Installation

```bash
# Clone the repository
git clone git@github.com:juliandewulf/ENTSO-E.git
cd ENTSO-E

# Install dependencies
make install
# or directly with pnpm
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your ENTSO-E API token
# Get your token from: https://transparency.entsoe.eu/
```

**Environment Variables:**
- `VITE_ENTSOE_API_TOKEN`: Your ENTSO-E API security token
- `VITE_ENTSOE_API_BASE_URL`: API base URL (default: https://web-api.tp.entsoe.eu)
- `VITE_USE_MOCK_DATA`: Set to `true` for development with mock data

### 3. Development

```bash
# Start development server
make dev
# The app will be available at http://localhost:5173

# Or start with Docker
make dev-up
```

### 4. Building & Testing

```bash
# Run tests
make test

# Run tests with UI
make test-ui

# Build for production
make build

# Run linting
make lint

# Type checking
make typecheck
```

## Development Commands

The project uses a Makefile for streamlined development. Run `make help` to see all available commands:

### Core Commands
- `make install` - Install dependencies
- `make setup` - Complete development environment setup
- `make dev` - Start development server
- `make build` - Build production bundle

### Testing & Quality
- `make test` - Run unit tests
- `make test-coverage` - Run tests with coverage report
- `make lint` - Run ESLint checks
- `make format` - Format code with Prettier
- `make typecheck` - Run TypeScript type checking

### Documentation
- `make storybook` - Start Storybook development server
- `make build-storybook` - Build Storybook for production

### Docker
- `make dev-up` - Start development environment with Docker
- `make dev-down` - Stop Docker development environment
- `make docker-build` - Build Docker image
- `make docker-run` - Run Docker container

## Project Structure

```
src/
├── components/           # React components
│   ├── CountrySelector/  # Country dropdown component
│   ├── DatePicker/       # Date selection component
│   ├── Dashboard/        # Main dashboard container
│   ├── GenerationChart/  # Chart visualization component
│   ├── SummaryCards/     # Summary statistics cards
│   └── ErrorBoundary/    # Error boundary component
├── services/             # API services and data fetching
│   ├── entsoeApi.ts      # ENTSO-E API client
│   └── mockData.ts       # Mock data for development
├── utils/                # Utility functions
│   ├── constants.ts      # Application constants
│   └── dataProcessing.ts # Data transformation utilities
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
└── test/                 # Test utilities and setup
```

## API Integration

### ENTSO-E Transparency Platform

The application integrates with the ENTSO-E Transparency Platform API to fetch real-time electricity generation data.

**Getting an API Token:**
1. Visit [ENTSO-E Transparency Platform](https://transparency.entsoe.eu/)
2. Register for an account
3. Follow the [token generation guide](https://transparencyplatform.zendesk.com/hc/en-us/articles/12845911031188-How-to-get-security-token)
4. Add your token to the `.env` file

**Supported Endpoints:**
- Actual Generation per Type (Document Type A75)
- Process Type: Realised (A16)

### Mock Data Mode

For development and testing, the application includes comprehensive mock data. Set `VITE_USE_MOCK_DATA=true` in your `.env` file to use mock data instead of the real API.

## Testing

The project includes comprehensive testing with high coverage:

### Unit Tests
- Utility functions (`src/utils/__tests__/`)
- API services (`src/services/__tests__/`)
- Data processing logic

### Component Tests
- React Testing Library for component behavior
- User interaction testing
- Accessibility testing
- Error boundary testing

### Running Tests

```bash
# Run all tests
make test

# Run tests with coverage
make test-coverage

# Run tests with UI
make test-ui
```

## Documentation

### Storybook

Interactive component documentation is available through Storybook:

```bash
# Start Storybook
make storybook
# Available at http://localhost:6006
```

**Documented Components:**
- GenerationChart - Interactive chart visualization
- SummaryCard - Statistical summary cards
- CountrySelector - Country dropdown selection

## Deployment

### Docker Deployment

```bash
# Build production Docker image
make docker-build

# Run production container
make docker-run
# Available at http://localhost:3000
```

### Manual Deployment

```bash
# Build the application
make build

# The built files will be in the 'dist' directory
# Deploy the contents to your web server
```

## Architecture Decisions

### State Management
- Uses React hooks for local component state
- Custom hooks for data fetching and API integration
- No global state management (Redux/Zustand) - not needed for this scope

### Data Flow
1. User selects country and date
2. Dashboard component triggers API call via custom hook
3. API service handles authentication and data fetching
4. Data is processed and transformed for visualization
5. Components render charts and summaries

### Error Handling
- Error boundaries for React component errors
- API error handling with retry functionality
- Graceful degradation with mock data fallback
- User-friendly error messages

### Performance
- Memoized chart data to prevent unnecessary re-renders
- Lazy loading of chart components
- Efficient data processing utilities
- Optimized bundle size with tree shaking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`make test`)
5. Run linting (`make lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new components and utilities
- Update Storybook documentation for UI components
- Use the provided ESLint and Prettier configurations
- Follow Material-UI design principles

## Troubleshooting

### Common Issues

**API Token Not Working:**
- Ensure your token is correctly set in `.env`
- Check that the token is valid and not expired
- Verify the token has necessary permissions

**Chart Not Rendering:**
- Check browser console for JavaScript errors
- Ensure Chart.js dependencies are properly loaded
- Try refreshing with mock data enabled

**Build Failures:**
- Run `pnpm install` to ensure all dependencies are installed
- Check for TypeScript errors with `make typecheck`
- Ensure all required environment variables are set

**Docker Issues:**
- Ensure Docker is running
- Try rebuilding the image: `make clean && make docker-build`
- Check Docker logs: `make dev-logs`

### Getting Help

- Check the GitHub Issues for known problems
- Review the Storybook documentation for component usage
- Run tests to identify specific issues: `make test`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ENTSO-E](https://www.entsoe.eu/) for providing the Transparency Platform API
- [Material-UI](https://mui.com/) for the excellent React components
- [Chart.js](https://www.chartjs.org/) for the charting capabilities