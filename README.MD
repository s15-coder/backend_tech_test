# Backend Technical Test

Welcome to the **Backend Technical Test** project! This application is built using **Node.js** and is designed to demonstrate backend development skills.

## Features

- RESTful API endpoints.
- Authentication and authorization.
- Database integration.
- Error handling and validation.
- Scalable and modular architecture.
- Mapbox API integration to look for restaurants nearby.
- Create transactions and retrieve them using pagination.s

## Prerequisites

- **Node.js**
- **npm**
- **PostgreSQL**:

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:s15-coder/backend_tech_test.git
   cd backend_tech_test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the required variables. You can refer to the `example.env` file in the root directory for the placeholders and required values.

## Usage

To get information about the available endpoints, visit the [API Postman Documentation](https://documenter.getpostman.com/view/10799279/2sB2j4gBcN).

### Development Server

Start the development server:

```bash
npm run dev
```

### Production Build

Build and start the production server:

```bash
npm run build
npm start
```

## Testing

Run the test suite:

```bash
npm test
```
## Architecture

This project follows a **Controller-Service-Repository** architecture pattern to ensure separation of concerns, scalability, and maintainability.

## Folder Structure

```
backend_tech_test/
├── src/
│   ├── config/
│   ├── features/
│   │   ├── controller.ts
│   │   ├── repository.ts
│   │   └── service.ts
│   ├── middlewares/
│   ├── repository/
│   └── types/
├── tests/
├── .example.env
├── package.json
└── README.md
```