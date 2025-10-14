import { betterAuth } from "better-auth";
// import { client } from "@/db"; //
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const auth = betterAuth({
  // database: mongodbAdapter(client),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: "",
      clientSecret: "",
    },
  },
});
