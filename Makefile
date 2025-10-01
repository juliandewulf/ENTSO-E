.PHONY: help install setup dev dev-up dev-down dev-logs build test test-ui test-coverage lint lint-fix format typecheck storybook build-storybook docker-build docker-run clean

# Default target
help:
	@echo "ENTSO-E Dashboard Development Commands"
	@echo "====================================="
	@echo "install            - Install dependencies with pnpm"
	@echo "setup              - Complete development environment setup"
	@echo "dev                - Start development server"
	@echo "dev-up             - Start development environment with Docker"
	@echo "dev-down           - Stop Docker development environment"
	@echo "dev-logs           - View Docker development logs"
	@echo "build              - Build production bundle"
	@echo "test               - Run unit tests"
	@echo "test-ui            - Run tests with UI"
	@echo "test-coverage      - Run tests with coverage report"
	@echo "lint               - Run ESLint checks"
	@echo "lint-fix           - Fix ESLint issues automatically"
	@echo "format             - Format code with Prettier"
	@echo "typecheck          - Run TypeScript type checking"
	@echo "storybook          - Start Storybook development server"
	@echo "build-storybook    - Build Storybook for production"
	@echo "docker-build       - Build Docker image"
	@echo "docker-run         - Run Docker container"
	@echo "clean              - Clean up build artifacts and containers"

# Installation
install:
	@echo "📦 Installing dependencies with pnpm..."
	pnpm install
	@echo "✅ Dependencies installed!"

# Development
dev:
	@echo "🚀 Starting development server..."
	pnpm run dev

setup: install
	@echo "🎉 Development environment ready!"
	@echo "📋 Next steps:"
	@echo "   1. Copy .env.example to .env and add your ENTSO-E API token"
	@echo "   2. Run 'make dev' to start the development server"
	@echo "   3. Visit http://localhost:5173"

# Docker Development
dev-up:
	@echo "🚀 Starting development environment with Docker..."
	docker compose up -d --build
	@echo "✅ Development server started:"
	@echo "   🌐 Frontend: http://localhost:5173"

dev-down:
	@echo "🛑 Stopping Docker development environment..."
	docker compose down

dev-logs:
	@echo "📋 Viewing Docker development logs..."
	docker compose logs -f

# Build
build:
	@echo "🏗️ Building production bundle..."
	pnpm run build
	@echo "✅ Production build complete!"

# Testing
test:
	@echo "🧪 Running unit tests..."
	pnpm run test

test-ui:
	@echo "🧪 Running tests with UI..."
	pnpm run test:ui

test-coverage:
	@echo "🧪 Running tests with coverage..."
	pnpm run test:coverage

# Code Quality
lint:
	@echo "🔍 Running ESLint checks..."
	pnpm run lint

lint-fix:
	@echo "🔧 Fixing ESLint issues..."
	pnpm run lint:fix

format:
	@echo "✨ Formatting code with Prettier..."
	pnpx prettier --write .

typecheck:
	@echo "🔍 Running TypeScript type checking..."
	pnpm run typecheck

# Storybook
storybook:
	@echo "📚 Starting Storybook development server..."
	pnpm run storybook

build-storybook:
	@echo "📚 Building Storybook for production..."
	pnpm run build-storybook

# Docker Production
docker-build:
	@echo "🐳 Building Docker image..."
	docker build -f deployment/Dockerfile -t zaphiro-dashboard .
	@echo "✅ Docker image built!"

docker-run:
	@echo "🐳 Running Docker container..."
	docker run -p 3000:3000 zaphiro-dashboard

# Cleanup
clean:
	@echo "🧹 Cleaning up..."
	rm -rf node_modules dist coverage storybook-static
	docker compose down -v 2>/dev/null || true
	docker system prune -f
	@echo "✅ Cleanup complete!"
