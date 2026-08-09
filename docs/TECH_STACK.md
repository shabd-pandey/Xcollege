# Tech_stack
This document defines the technologies, frameworks, libraries,
services, and architectural decisions used in this project.

The goal of this file is to ensure that all development follows
a consistent technical architecture.

AI coding agents and developers MUST follow the technologies and
rules defined in this document unless a deliberate architecture
change is approved.

## Stack Overview

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js | Application UI and routing |
| Language | TypeScript | Type-safe application development |
| Styling | Tailwind CSS | UI styling |
| Backend | Next.js Server Functions/API | Server-side logic |
| Database | Firebase Firestore | Application data |
| Authentication | Firebase Authentication | User authentication |
| Storage | Firebase Storage | File/image storage |
| Deployment | Vercel | Application hosting |
| Version Control | Git + GitHub | Source control |

## Frontend

### Framework

The project uses Next.js for the frontend application.

Next.js is responsible for:

- Page routing
- UI rendering
- Server and client components
- API/server functionality
- Application structure
- Production builds

### Language

The primary programming language is TypeScript.

All new application code should use TypeScript.

JavaScript should not be introduced unless there is a specific
technical reason.

### Component Architecture

The UI should be built using reusable React components.

Components should be organized according to their responsibility.

Example:

components/
├── ui/
├── layout/
├── forms/
├── dashboard/
└── products/

Avoid putting large amounts of UI logic inside a single page component.

## Styling

The project uses Tailwind CSS for styling.

### Rules

- Use Tailwind utility classes for normal styling.
- Avoid creating separate CSS files for individual components.
- Reusable UI styles should be extracted into reusable components.
- Do not introduce another CSS framework.
- Maintain consistent spacing, typography, colors, and responsive behavior.

### Responsive Design

The application must support:

- Mobile
- Tablet
- Desktop

Design mobile-first whenever practical.

### Design System

Primary color:
- Blue

Secondary color:
- Gray

Border radius:
- Rounded

Typography:
- Modern sans-serif

Buttons:
- Consistent height
- Consistent border radius
- Clear hover and disabled states

## Backend

The backend functionality is implemented using Next.js server-side
functionality.

Server-side code is responsible for:

- Database operations
- Authentication-related server logic
- Secure API operations
- Business logic
- External API communication
- Sensitive operations

Client components should not directly contain sensitive business logic.

Secrets and private API keys must never be exposed to the browser.

### API Strategy

API endpoints should be created only when server-side communication
is required.

API routes should follow REST-style conventions where appropriate.

Example:

GET    /api/products
POST   /api/products
GET    /api/products/[id]
PUT    /api/products/[id]
DELETE /api/products/[id]

## Database

The project uses Firebase Firestore as its primary database.

Firestore stores application data such as:

- Users
- Products
- Orders
- Categories
- Transactions
- Application settings

### Database Rules

Database access must follow the defined Firestore security rules.

Do not create duplicate collections for the same entity.

Use consistent document naming and field naming.

Example:

users/
products/
orders/
categories/
### Example Product Document

products/{productId}

{
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  categoryId: string,
  stock: number,
  createdAt: timestamp,
  updatedAt: timestamp
}

## Authentication

Firebase Authentication is used for user authentication.

Supported authentication methods:

- Email/password
- Google authentication

Authentication state should be managed centrally.

Protected pages must verify that the user is authenticated.

Users must not be able to access protected resources simply by
navigating directly to a URL.

## State Management

The project will primarily use React's built-in state management.

Use:

- useState for local component state
- useEffect for side effects
- Context only when state must be shared across multiple components

Do not introduce Redux, Zustand, or another state management library
unless the application architecture requires it.

## Form Validation

User input must be validated before being submitted.

Validation should occur:

1. On the client for immediate user feedback.
2. On the server for security and data integrity.

Client-side validation must never be considered sufficient security.

Invalid data must not be stored in the database.

## Deployment

The application will be deployed using Vercel.

### Deployment Flow

Developer
    ↓
Git
    ↓
GitHub
    ↓
Vercel
    ↓
Production

Every production deployment should come from the main branch.

Environment variables must be configured in the deployment
environment and must not be committed to Git.

## Environment Variables

Secrets and environment-specific configuration must be stored in
environment variables.

Example:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

CURRENCY_API_KEY=

### Rules

- Never hardcode API keys.
- Never commit `.env.local`.
- `.env.local` must be included in `.gitignore`.
- Public variables must use the appropriate NEXT_PUBLIC_ prefix.
- Private secrets must never use NEXT_PUBLIC_.


## Application Architecture

The application follows a layered architecture.

User
 ↓
UI / Components
 ↓
Client Logic
 ↓
Server/API Layer
 ↓
Business Logic
 ↓
Firebase
 ↓
Firestore / Storage / Authentication

### Frontend Layer

Responsible for:

- Rendering UI
- User interaction
- Form input
- Displaying data

### Server Layer

Responsible for:

- Secure operations
- Business logic
- Database operations
- External API communication

### Database Layer

Responsible for:

- Persistent application data
- Relationships between entities
- Data retrieval and storage

## Error Handling

Errors must be handled explicitly.

The application should:

- Show useful messages to users.
- Log useful technical information during development.
- Avoid exposing sensitive backend information.
- Handle API failures gracefully.
- Handle database failures gracefully.
- Handle loading states.
- Handle empty states.

Never silently ignore important errors.

## Technologies We Do Not Use

The following technologies should NOT be introduced unless the
architecture is deliberately changed:

- Redux
- MongoDB
- PostgreSQL
- Express.js
- Bootstrap
- Material UI
- Prisma
- Supabase

Do not replace Firebase with another database.

Do not introduce a second CSS framework.

Do not introduce a second backend framework.

## Technology Decision Rules

When implementing a new feature:

1. First use technologies already present in the project.
2. Do not install a new dependency if the existing stack can solve
   the problem.
3. Do not introduce a new framework without architectural approval.
4. Do not replace an existing technology simply because another
   technology is more popular.
5. Prefer simple solutions over unnecessary abstractions.
6. Keep the architecture consistent with this document.
7. If a requirement conflicts with this document, explain the conflict
   before changing the architecture.

   