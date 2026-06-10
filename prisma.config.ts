import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 moves the datasource URL out of schema.prisma. The CLI
 * (migrate / db push / studio) reads it from here; the runtime client uses a
 * driver adapter (see src/lib/prisma.ts). We load .env explicitly because the
 * Prisma CLI no longer does so automatically.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
