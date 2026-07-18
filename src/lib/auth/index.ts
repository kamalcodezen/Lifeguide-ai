import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import mongoose from "mongoose";
import { dbConnect } from "@/database/connection/dbConnect";

// Trigger Mongoose connection setup asynchronously (buffered internally by Mongoose)
dbConnect().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Mongoose background connection error:", err);
});

// Lazy-evaluation Proxy for MongoDB Db instance
const dbProxy = new Proxy({} as mongoose.mongo.Db, {
  get(target, prop) {
    const db = mongoose.connection.db;
    if (!db) {
      return typeof Reflect.get(target, prop) === "function" ? () => {} : undefined;
    }
    const value = Reflect.get(db, prop);
    if (typeof value === "function") {
      return value.bind(db);
    }
    return value;
  },
});

// Lazy-evaluation Proxy for MongoDB MongoClient instance
const clientProxy = new Proxy({} as mongoose.mongo.MongoClient, {
  get(target, prop) {
    let client: mongoose.mongo.MongoClient | null = null;
    try {
      client = mongoose.connection.getClient() as unknown as mongoose.mongo.MongoClient;
    } catch {
      // Ignored during compile/build step
    }
    if (!client) {
      return typeof Reflect.get(target, prop) === "function" ? () => {} : undefined;
    }
    const value = Reflect.get(client, prop);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("Missing BETTER_AUTH_SECRET environment variable.");
}

export const auth = betterAuth({
  database: mongodbAdapter(dbProxy, {
    client: clientProxy,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
