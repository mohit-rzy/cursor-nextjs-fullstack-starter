# Gift List Manager - Software Requirements Specification

## System Design

- **Single-Page Application**: Build a responsive SPA using Next.js 15 for seamless user experience
- **Server-Side Rendering**: Utilize Next.js server components for improved performance and SEO
- **API Layer**: Implement tRPC for type-safe API communication between client and server
- **Authentication**: Integrate Clerk for secure user authentication and authorization
- **Database**: Use PostgreSQL with Drizzle ORM for data persistence
- **Caching**: Implement Redis for performance optimization and session management
- **UI Components**: Utilize shadcn/ui with Tailwind CSS for consistent design implementation
- **Form Handling**: Use react-hook-form with Zod for form validation and management
- **Responsive Design**: Implement responsive layouts following the UI design document specifications

## Architecture Pattern

- **Feature-Based Architecture**: Organize code based on features rather than technical layers
- **Clean Architecture Principles**:
  - Clear separation between domain, application, and infrastructure layers
  - Domain-driven design for core business logic
  - Dependency injection for loose coupling
- **Next.js App Router**: Structure application using the latest Next.js app router pattern
- **Server Components**: Utilize React Server Components for improved performance where applicable
- **API Layer**: Implement tRPC router structure for type-safe API endpoints

## State Management

- **React Query Integration**: Use @trpc/tanstack-react-query for server state management
- **Form State**: Manage form state using react-hook-form
- **Local State**: Use React's useState and useReducer for component-level state
- **Context API**: Implement React Context for shared state where necessary
- **Validation**: Apply Zod schemas for runtime type validation throughout the application

## Data Flow

- **Client-Server Communication**:
  - Client requests through tRPC procedures
  - Server processes requests and returns typed responses
  - Client updates UI based on returned data
- **Authentication Flow**:
  - Clerk handles authentication and provides session information
  - Protected routes check authentication status before rendering
  - API endpoints verify authentication before processing requests
- **CRUD Operations**:
  - Create: Form submission → Validation → API call → Database update → UI refresh
  - Read: Component mount → API call → Data fetching → UI rendering
  - Update: Form submission → Validation → API call → Database update → UI refresh
  - Delete: Confirmation dialog → API call → Database update → UI refresh

## Technical Stack

- **Frontend**:

  - Next.js 15 (React framework)
  - TypeScript (Type-safe JavaScript)
  - Tailwind CSS (Utility-first CSS framework)
  - shadcn/ui (Component library)
  - react-hook-form (Form management)
  - @trpc/tanstack-react-query (Data fetching and caching)

- **Backend**:

  - Next.js API routes
  - tRPC (Type-safe API)
  - Zod (Schema validation)
  - Drizzle ORM (Database ORM)
  - Drizzle Kit (Migration management)

- **Authentication**:

  - Clerk (Authentication service)

- **Database**:

  - PostgreSQL (Relational database)
  - Redis (Caching layer)

- **DevOps**:
  - Docker Compose (Local development environment)
  - pnpm (Package manager)

## Authentication Process

- **User Registration**:

  - Implement Clerk sign-up process
  - Capture necessary user information (email, password)
  - Create user record in the database upon successful registration

- **User Login**:

  - Utilize Clerk sign-in process
  - Validate credentials and generate session
  - Redirect to protected dashboard upon successful authentication

- **Session Management**:

  - Leverage Clerk session management
  - Implement proper session handling for protected routes
  - Use Redis for session caching if necessary

- **Authorization**:
  - Implement role-based access control if needed for future scaling
  - Secure API endpoints with authentication checks
  - Protect frontend routes with authentication guards

## Route Design

- **Public Routes**:

  - `/` - Landing page
  - `/sign-in` - User login page
  - `/sign-up` - User registration page
  - `/password-reset` - Password recovery page

- **Protected Routes**:
  - `/dashboard` - Main gift list view
  - `/gifts/new` - Create new gift
  - `/gifts/[id]` - View/edit specific gift
  - `/profile` - User profile management
  - `/settings` - User settings page

## API Design

- **Authentication Endpoints**:

  - Managed by Clerk

- **Gift Management Endpoints**:

  - `gifts.getAll` - Retrieve all gifts for authenticated user
  - `gifts.getById` - Retrieve specific gift by ID
  - `gifts.create` - Create new gift
  - `gifts.update` - Update existing gift
  - `gifts.delete` - Delete gift
  - `gifts.search` - Search gifts by query parameters

- **User Profile Endpoints**:
  - `user.getProfile` - Retrieve user profile
  - `user.updateProfile` - Update user profile

## Database Design ERD

### Tables

- **Users** (managed by Clerk):

  - `id` (Primary Key)
  - `email`
  - `created_at`
  - `updated_at`

- **Gifts**:
  - `id` (Primary Key)
  - `user_id` (Foreign Key to Users)
  - `product_name`
  - `description`
  - `price`
  - `importance_level` (enum: 'high', 'medium', 'low')
  - `created_at`
  - `updated_at`

### Relationships

- One **User** can have many **Gifts** (One-to-Many)

### Indexes

- `gifts.user_id` (For efficient querying of gifts by user)
- `gifts.importance_level` (For efficient filtering by importance)
- `gifts.price` (For efficient sorting and filtering by price)
