
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Vercel build step runs prisma generate without access to env vars unless explicitly injected.
// We provide a fallback string here solely for the generator to run successfully.
const dbUrl = process.env.DATABASE_URL || "postgresql://dummy:password@localhost:5432/dummy";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: dbUrl,
  },
});
