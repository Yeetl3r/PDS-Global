import { defineConfig } from "prisma/config";

// Prisma 7 no longer auto-loads .env — do it here so `prisma migrate` and
// friends see DATABASE_URL in local dev.
try {
  process.loadEnvFile(".env");
} catch {
  // no .env present (CI / production) — env comes from the platform
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Used by `prisma migrate` / `prisma db` CLI commands only; the runtime
    // client gets its connection via the pg driver adapter in lib/db.ts.
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/pdsglobal",
  },
});
