# Anime Store Backend

A production-ready backend for an Anime Store built using Robert C. Martin's Clean Architecture principles in Node.js.

## Architecture Overview

This project follows Clean Architecture with strict separation of concerns:

- **Domain Layer**: Contains enterprise business logic and entities
- **Application Layer**: Contains use cases and application services
- **Infrastructure Layer**: Contains external concerns (database, external APIs)
- **Presentation Layer**: Contains REST API controllers and routes
- **Shared Layer**: Contains common utilities, types, and constants

## Features

### Customer Features
- User registration and authentication (JWT)
- Product browsing with search and filtering
- Shopping cart management
- Order placement and tracking
- Product reviews and ratings
- Wishlist management

### Admin Features
- Product CRUD operations
- Category management
- Inventory management
- User management
- Order management
- Dashboard analytics

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Access + Refresh tokens)
- **Caching**: Redis planned for production scale only
- **Validation**: Joi
- **DI Container**: Inversify
- **Testing**: Jest
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Redis is optional and currently disabled for local/dev
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ideepgagan740/animestore.git
cd animestore/server
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB

5. Run the application
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## API Documentation

Once the server is running, visit `http://localhost:3000/api-docs` for Swagger documentation.

## Project Structure

```
src/
├── domain/                 # Enterprise business rules
│   ├── entities/          # Domain entities
│   ├── value-objects/     # Value objects
│   └── repositories/      # Repository interfaces
├── application/           # Application business rules
│   ├── use-cases/        # Use cases / interactors
│   ├── services/         # Application services
│   └── dtos/             # Data transfer objects
├── infrastructure/        # External concerns
│   ├── database/         # Database implementations
│   ├── cache/            # Future production cache implementations
│   ├── external-services/# External APIs
│   └── config/           # Configuration
├── presentation/          # Delivery mechanisms
│   ├── routes/           # API routes
│   ├── controllers/      # Route handlers
│   └── middlewares/      # Express middlewares
└── shared/               # Shared utilities
    ├── types/            # TypeScript types
    ├── utils/            # Utility functions
    ├── constants/        # Application constants
    └── errors/           # Custom error classes
```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## Scripts

- `npm run build` - Compile TypeScript
- `npm run start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Security

- Password hashing with bcrypt
- JWT authentication with refresh tokens
- Helmet for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization

## Database Schema

### Collections
- `users` - User accounts
- `anime_products` - Product catalog
- `categories` - Product categories
- `carts` - Shopping carts
- `orders` - Customer orders
- `reviews` - Product reviews
- `wishlists` - User wishlists
- `payments` - Payment records

## Contributing

1. Follow the Clean Architecture principles
2. Write tests for new features
3. Update documentation
4. Follow the existing code style
5. Use meaningful commit messages

## License

ISC