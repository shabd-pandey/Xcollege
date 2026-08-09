# Architecture

## 1. Architecture Overview

The application follows a layered architecture that separates the
user interface, application logic, data access, and external services.

The primary goal of the architecture is to keep different
responsibilities separated so that individual parts of the system
can be developed, tested, and modified independently.

The main layers are:

- Presentation Layer
- Application/Business Logic Layer
- Data Access Layer
- External Services Layer

### System Flow

1. The user interacts with the frontend.
2. The frontend handles user interaction and presentation.
3. Requests requiring application logic are sent to the server layer.
4. The server performs validation and business logic.
5. Data operations are performed through the data layer.
6. External services are accessed when required.
7. The result is returned to the frontend.
8. The frontend updates the interface.

## 3. Application Layers

### Presentation Layer

Responsible for:

- Rendering UI
- User interaction
- Forms
- Loading states
- Error states
- Displaying application data

The presentation layer should not contain complex business logic.

---

### Application Layer

Responsible for:

- Business rules
- Application operations
- Coordinating different services
- Processing user requests

This layer should not be tightly coupled to UI components.

---

### Data Access Layer

Responsible for:

- Reading data
- Writing data
- Updating data
- Deleting data
- Database-specific operations

Database queries should be kept out of UI components whenever
practical.

---

### External Services Layer

Responsible for communication with:

- Third-party APIs
- Email services
- Other external systems

## 4. Frontend Architecture

The frontend is organized around reusable components and application
pages.

The frontend consists of:

- Pages/routes
- Layout components
- Reusable UI components
- Forms
- Client-side state
- Data-fetching logic

### Pages

Pages are responsible for composing the UI required for a particular
route.

Pages should avoid containing large reusable components.

### Components

Components represent reusable UI elements.

Examples:

- Button
- Modal
- Form
- Card
- Navigation
- Table

### Forms

Forms are responsible for collecting and validating user input before
sending it to the appropriate application operation.

## 5. Backend Architecture

The backend is responsible for operations that should not be performed
directly by the client.

Responsibilities include:

- Authentication verification
- Authorization
- Business logic
- Database operations
- External API communication
- Server-side validation

## 6. Data Flow

A typical data operation follows this flow:

User
 ↓
UI Component
 ↓
Application Request
 ↓
Server
 ↓
Validation
 ↓
Business Logic
 ↓
Database
 ↓
Server Response
 ↓
UI Update

### Example: Creating a Record

1. User fills out a form.
2. Frontend performs basic input validation.
3. Frontend sends the data to the server.
4. Server authenticates the user.
5. Server validates the submitted data.
6. Business logic processes the request.
7. Data is stored in the database.
8. Server returns the result.
9. Frontend updates the UI.

## 7. Authentication Flow

The authentication process follows:

User
 ↓
Login Form
 ↓
Authentication Service
 ↓
Authentication Provider
 ↓
Authenticated Session
 ↓
Protected Application

### Protected Resources

Protected resources must verify:

1. The user is authenticated.
2. The user has permission to access the resource.
3. The requested resource belongs to the user when applicable.

## 8. Database Interaction

UI components should not directly contain database queries.

Database operations should go through the appropriate data/service
layer.

Example:

UI
 ↓
Service
 ↓
Data Access
 ↓
Database

### Rules

- Database operations should be centralized.
- UI components should not contain complex database queries.
- Database errors must be handled.
- User authorization must be checked before accessing protected data.

## 9. External Services

External services are accessed through dedicated service modules.

The frontend should not directly communicate with services that require
private credentials.

Flow:

Application
 ↓
Server/Service Layer
 ↓
External Service
 ↓
Response
 ↓
Application

## 10. Code Structure

src/
│
├── app/
│   ├── pages/
│   └── routes/
│
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
│
├── services/
│
├── data/
│
├── lib/
│
├── types/
│
└── utils/

### components/

Contains reusable UI components.

### services/

Contains application services and external service communication.

### data/

Contains database/data-access functionality.

### lib/

Contains shared infrastructure and configuration.

### types/

Contains shared types.

### utils/

Contains small reusable utility functions.

## 12. Security Boundaries

### Client

The client can:

- Display information
- Collect user input
- Perform basic validation
- Request application operations

The client must NOT:

- Store private secrets
- Perform privileged database operations
- Make trusted authorization decisions

### Server

The server is responsible for:

- Authentication verification
- Authorization
- Sensitive operations
- Server-side validation
- Private API credentials