import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// This file is for schema generation only
export const auth = betterAuth({
  database: prismaAdapter(
    {} as any, // Don't need actual client for schema generation
    {
      provider: "postgresql",
    }
  ),
  emailAndPassword: {
    enabled: true,
  },
});
