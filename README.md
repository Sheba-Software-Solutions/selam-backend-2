# Selam Software Backend

Professional Node.js + Express + TypeScript backend for Selam Software website.

## Features
- Layered architecture (API, Service, Repository, Common, Infra)
- Prisma ORM (PostgreSQL)
- JWT authentication (access/refresh)
- Admin & public endpoints
- Audit logging
- Validation (Zod recommended)
- Dockerized for deployment


# Quick Start

```bash
# Install dependencies
npm install

# Set up MongoDB Atlas cluster and get connection string
# Copy environment variables
cp .env.example .env

# Prisma generate (no migrate for MongoDB)
npx prisma generate

# Run dev server
npm run dev
```

## Folder Structure

- `src/api` - Route handlers (controllers)
- `src/services` - Business logic
- `src/repositories` - Prisma client abstractions
- `src/common` - Validation, errors, auth utils
- `src/infra` - Config, db, logger
- `prisma` - Prisma schema & migrations
- `tests` - Unit & integration tests

## License
Internal proprietary system. All rights reserved by Selam Software Solutions.
