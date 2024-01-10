# Data Handling v3

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Docker

## Running the app (Docker)

```bash
# docker-compose up build command.
$ yarn compose:up

```


## Installation (Local - node.js)

```bash
$ yarn
```

## Running the app (Local)

```bash
# Development mode
$ yarn start

# Watch mode
$ yarn start:dev

# Production mode
$ yarn start:prod
```

## Test

```bash
# Run unit tests
$ yarn test

# Run end-to-end tests
$ yarn test:e2e

# Generate test coverage
$ yarn test:cov

# Run tests in watch mode
$ yarn test:watch
```

# Swagger API Documentation

## Accessing the Documentation

This project includes an interactive API documentation using Swagger UI, which provides a convenient way to explore and test the API endpoints.

To access the Swagger UI:

1. Ensure the application is running (either locally or in a Docker container).
2. Open a web browser and navigate to [http://localhost:3000/api/](http://localhost:3000/api/).

## Features of Swagger UI

- **Interactive Documentation**: View detailed information about all API endpoints, including HTTP methods, request parameters, and response.
- **Schema Visualization**: Swagger provides a clear visualization of the API's data models.

## Navigating the Swagger UI

- **Endpoints List**: The main page lists all available API endpoints grouped by resource type.
- **Endpoint Details**: Click on any endpoint to expand its details. so you can view the request format, required parameters, and response schema.

## Using Swagger for Testing

- **Authentication**: If the API requires authentication, you can add authentication tokens or credentials as needed (I left the token key in the description first line, so please use it to access any api under Users collections).
- **Customization**: Modify request parameters as required to test different scenarios.

- **Demo-Token**: ```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiU2VsZW5hLlBoYW1AaGF5cy5jby5qcCIsImV4cCI6MTczNjM0MjMxNn0.gaD3SyxT7UwVm5kUMUhtDhHEpxmQ4cCq7v5S3qXN-VQ```

## Note

The Swagger UI is only accessible when the application is running and is configured to include Swagger.

## License

Nest is [MIT licensed](LICENSE).
