import { betterAuth } from "better-auth";
import { prisma } from "./db";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mongodb" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    maxPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  basePath: "/api/auth",
});
