# Haven — Tailwind login page

A responsive, warm-toned login and registration experience built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. Registration saves users in PostgreSQL with bcrypt-hashed passwords; login verifies credentials and creates an HTTP-only signed session cookie.

## Run locally

1. Install Node.js 20.9 or newer and PostgreSQL.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` plus a random `AUTH_SECRET` (at least 32 characters).
3. Install dependencies and initialize the database:

   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

4. Open http://localhost:3000.

Example secret: generate one with `openssl rand -base64 32`. Never commit your `.env` file.

## Authentication routes

- `POST /api/auth/register` accepts `{ "name", "email", "password" }`.
- `POST /api/auth/login` accepts `{ "email", "password" }`.
- `POST /api/auth/logout` clears the session cookie.

Passwords use bcrypt with a cost factor of 12. Session tokens are signed using HS256 and stored in an HTTP-only, same-site cookie for seven days. Before production, add rate limiting, email verification, password reset, and account/session management as appropriate for your deployment.
