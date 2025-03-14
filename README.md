# Gift List Manager

A modern, full-stack web application built with Next.js 15 that allows users to effortlessly create and manage gift lists. Perfect for keeping track of gift ideas for holidays, birthdays, or any special occasion.

![Gift List Manager](public/gift-illustration.svg)

## Features

- **User Authentication**: Secure sign-up and login functionality powered by Better Auth
- **Gift Management**: Create, read, update, and delete gift items
- **Sorting & Filtering**: Sort gifts by various attributes and filter with search functionality
- **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **Better Auth**: Authentication Library
- **TypeScript**: Type-safe JavaScript
- **TanStack React Query**: Data fetching and state management
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality UI components
- **React Hook Form**: Form validation and handling
- **Zod**: Schema validation

### Backend

- **tRPC**: End-to-end typesafe APIs
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **PostgreSQL**: Relational database
- **Redis**: In-memory data store for caching and rate limiting

### DevOps & Tools

- **Docker**: Containerization for development environment
- **Jest**: Testing framework
- **ESLint & Prettier**: Code quality and formatting
- **Husky & lint-staged**: Git hooks for code quality

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Docker and Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohit-rzy/gift-list-manager.git
   cd gift-list-manager
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy the environment variables:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file

5. Start the infrastructure:

   ```bash
   pnpm infra:start
   ```

6. Run database migrations:

   ```bash
   pnpm db:push
   ```

7. Start the development server:

   ```bash
   pnpm dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode

### Infrastructure Commands

- `pnpm infra:start` - Start Docker containers (PostgreSQL, Redis, pgAdmin)
- `pnpm infra:stop` - Stop Docker containers
- `pnpm infra:logs` - View Docker container logs
- `pnpm infra:status` - Check Docker container status
- `pnpm infra:restart` - Restart Docker containers

### Database Commands

- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:push` - Push schema changes to the database
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio for database management

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── components/       # Client components
│   ├── dashboard/        # Dashboard page
│   ├── sign-in/          # Authentication pages
│   ├── trpc/             # tRPC client setup
│   └── ...
├── components/           # Shared UI components
├── context/              # Context documents for working with cursor
├── drizzle/              # Database migrations
├── lib/                  # Utility functions
├── public/               # Static assets
├── server/               # Backend code
│   ├── core/             # Core server functionality
│   ├── modules/          # Feature modules
│   │   └── gifts/        # Gifts module
│   └── test/             # Test utilities
└── ...
```

## Backend Architecture

The backend follows a modular architecture with each feature organized into its own module. Each module contains:

- `*.consts.ts` - Constants
- `*.db.ts` - Database schema
- `*.repository.ts` - Database access layer
- `*.service.ts` - Business logic
- `*.schema.ts` - Input/output schemas
- `*.router.ts` - tRPC router
- `__tests__/` - Tests for the module

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `pnpm commit`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Better Auth](https://better-auth.com)
- [Shadcn UI](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
