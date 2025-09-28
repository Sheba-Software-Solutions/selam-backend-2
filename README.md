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

# Run dev server
npm run dev
```

## API Documentation

- Interactive Swagger UI: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- OpenAPI spec: `swagger.yaml` in project root

All endpoints, request/response schemas, and error codes are documented in Swagger UI.

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

---

## Postman test suite (manual / importable)

This repository includes a recommended set of manual Postman requests and test scripts that exercise every public route. The tests below are Postman-style JS snippets you can paste into the Tests tab for each request. Create a Postman environment and add these variables before running the flows:

- `baseUrl` = http://localhost:8080
- `accessToken` = (optional; used if you add auth tokens)
- `adminUserId` = (set by auth login)
- `productId`, `jobId`, `applicationId`, `contactMessageId` = (set by create requests)
- `refreshToken` = (if refresh implemented)

How to use

1. Create a Postman environment and set the `baseUrl` variable.
2. Create requests as described in the sections below (URL, method, headers, body).
3. Paste the provided JavaScript into the Tests tab for each request.
4. Optional: paste the Pre-request Script snippets where provided.

Ordering suggestion

Run in this order to allow chaining and id capture:
1. GET /api/v1/health
2. POST /api/v1/auth/login -> sets `adminUserId`
3. POST /api/v1/products -> sets `productId`
4. Product CRUD flows
5. POST /api/v1/jobs -> sets `jobId`
6. POST /api/v1/jobs/:id/applications -> sets `applicationId`
7. Contact flows -> sets `contactMessageId`
8. GET /api/v1/audit-logs

Notes
- If a create returns 500, check the server console (run `npm run dev`) to see Mongoose/Zod validation errors.
- If routes become protected later, add header `Authorization: Bearer {{accessToken}}` (Pre-request snippet provided below).

---

### I. Health

Request
- GET {{baseUrl}}/api/v1/health

Tests
```javascript
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("success is true", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property('success', true);
  pm.expect(json).to.have.property('message');
});
```

### II. Auth

1) POST /api/v1/auth/login

Request
- POST {{baseUrl}}/api/v1/auth/login
- Body (JSON)
```json
{ "email": "admin@example.com", "password": "password123" }
```

Tests
```javascript
pm.test("Status is 200 or 401/400 handled", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,400,401]);
});

if (pm.response.code === 200) {
  const json = pm.response.json();
  pm.test("success true and user object exists", () => {
    pm.expect(json).to.have.property('success', true);
    pm.expect(json).to.have.property('data');
    pm.expect(json.data).to.have.property('_id');
    pm.environment.set("adminUserId", json.data._id);
  });
}
```

Note: current login returns the user object (no token). If you later return tokens, add code to save `accessToken`.

2) POST /api/v1/auth/refresh

Request
- POST {{baseUrl}}/api/v1/auth/refresh
- Body (JSON)
```json
{ "token": "{{refreshToken}}" }
```

Tests
```javascript
pm.test("Status is 200 or 500", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,500]);
});

if (pm.response.code === 200) {
  const json = pm.response.json();
  pm.test("success true", () => pm.expect(json).to.have.property('success', true));
}
```

3) POST /api/v1/auth/logout

Request
- POST {{baseUrl}}/api/v1/auth/logout
- Body (JSON)
```json
{ "token": "{{refreshToken}}" }
```

Tests
```javascript
pm.test("Status 200 or 500", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,500]);
});
```

4) GET /api/v1/auth/me

Request
- GET {{baseUrl}}/api/v1/auth/me?userId={{adminUserId}}

Tests
```javascript
pm.test("Status 200 or 404", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,404]);
});
if (pm.response.code === 200) {
  const json = pm.response.json();
  pm.test("success true and profile shape", () => {
    pm.expect(json).to.have.property('success', true);
    pm.expect(json).to.have.property('data');
    pm.expect(json.data).to.have.property('email');
  });
}
```

### III. Products

1) GET /api/v1/products

Request
- GET {{baseUrl}}/api/v1/products

Tests
```javascript
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("Response contains array data", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property('success', true);
  pm.expect(json).to.have.property('data');
  pm.expect(Array.isArray(json.data)).to.be.true;
});
```

2) POST /api/v1/products

Request
- POST {{baseUrl}}/api/v1/products
- Body example (JSON)
```json
{
  "name": "Test Product",
  "slug": "test-product",
  "category": "General",
  "shortDescription": "Example product for Postman test.",
  "priceModel": "ONE_TIME",
  "status": "ACTIVE"
}
```

Tests
```javascript
pm.test("Status is 201 or 500", () => {
  pm.expect(pm.response.code).to.be.oneOf([201,500]);
});
if (pm.response.code === 201) {
  const json = pm.response.json();
  pm.test("created product returned", () => {
    pm.expect(json).to.have.property('success', true);
    pm.expect(json).to.have.property('data');
    pm.expect(json.data).to.have.property('_id');
    pm.environment.set("productId", json.data._id);
  });
}
```

3) GET /api/v1/products/:id

Request
- GET {{baseUrl}}/api/v1/products/{{productId}}

Tests
```javascript
pm.test("Status 200 or 404", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,404]);
});
if (pm.response.code === 200) {
  const json = pm.response.json();
  pm.test("product shape", () => {
    pm.expect(json).to.have.property('success', true);
    pm.expect(json.data).to.have.property('_id', pm.environment.get("productId"));
  });
}
```

4) PUT /api/v1/products/:id

Request
- PUT {{baseUrl}}/api/v1/products/{{productId}}
- Body example (JSON)
```json
{ "name": "Updated Product", "shortDescription": "Updated description", "priceModel": "ONE_TIME" }
```

Tests
```javascript
pm.test("Status 200 or 500", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,500]);
});
if (pm.response.code === 200) {
  const json = pm.response.json();
  pm.test("product updated", () => {
    pm.expect(json).to.have.property('success', true);
    pm.expect(json.data).to.have.property('name', 'Updated Product');
  });
}
```

5) PATCH /api/v1/products/:id
- Same tests as PUT

6) POST /api/v1/products/:id/status

Request
- POST {{baseUrl}}/api/v1/products/{{productId}}/status
- Body:
```json
{ "status": "INACTIVE" }
```

Tests
```javascript
pm.test("Status 200 or 500", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,500]);
});
if (pm.response.code === 200) {
  const json = pm.response.json();
  pm.test("success true", () => pm.expect(json).to.have.property('success', true));
}
```

7) DELETE /api/v1/products/:id

Request
- DELETE {{baseUrl}}/api/v1/products/{{productId}}

Tests
```javascript
pm.test("Status 200 or 500", () => {
  pm.expect(pm.response.code).to.be.oneOf([200,500]);
});
if (pm.response.code === 200) {
  pm.test("success true", () => pm.expect(pm.response.json()).to.have.property('success', true));
  pm.environment.unset("productId");
}
```
