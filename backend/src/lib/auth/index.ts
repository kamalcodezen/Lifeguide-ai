import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import mongoose from "mongoose";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("Missing BETTER_AUTH_SECRET environment variable.");
}

const db = mongoose.connection.db;
const client = mongoose.connection.getClient();

if (!db || !client) {
  throw new Error("MongoDB Database instance is not initialized on the Mongoose connection.");
}

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client as any,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});
