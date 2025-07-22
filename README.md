# Backend for BareMade E-commerce

This is the backend for the BareMade e-commerce store, a RESTful API built with Node.js, Fastify, and Prisma. The API is responsible for managing products, including creation, listing, searching, pausing, and highlighting products.
The connection if the supabase is just made here

## Features

The API provides the following endpoints:

- `POST /product`: Creates a new product.
- `GET /products/featured`: Lists the featured products.
- `GET /products`: Lists all products.
- `GET /product/:slug`: Searches for a product by its slug.
- `PUT /product/:id/pause`: Pauses or unpauses a product.
- `PUT /product/:id/highlight`: Highlights or removes the highlight from a product.

## Main Libraries

The project uses the following main libraries:

- **Fastify**: A web framework for Node.js, focused on performance and low overhead.
- **Prisma**: An ORM (Object-Relational Mapper) for Node.js and TypeScript, which simplifies database access.
- **Zod**: A TypeScript-first schema validation library, used to validate the API's input data.
- **tsx**: A TypeScript executor for Node.js, which allows running the project in development without a separate compilation step.
- **@fastify/cors**: A Fastify plugin to enable CORS (Cross-Origin Resource Sharing).
- **@fastify/swagger`and`@fastify/swagger-ui**: Fastify plugins to generate API documentation in the OpenAPI (Swagger) format.

## How to Use

To run the project in a development environment, follow the steps below:

1. **Install the dependencies:**

   ```bash
   npm install
   ```

1. **Set up the database:**

   Make sure you have a PostgreSQL database running and set the `DATABASE_URL` environment variable in the `.env` file with your connection string.

   Example of `.env`:

   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
   ```

1. **Run the Prisma migrations:**

   ```bash
   npx prisma migrate dev
   ```

1. **Start the development server:**

   ```bash
   npm run dev
   ```

The server will be running at `http://localhost:3333`. The API documentation will be available at `http://localhost:3333/docs`.
