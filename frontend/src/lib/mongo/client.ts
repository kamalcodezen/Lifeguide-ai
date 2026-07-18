import { dbConnect } from "@/database/connection/dbConnect";

export async function getMongoClient() {
  const mongooseInstance = await dbConnect();
  return mongooseInstance.connection.getClient();
}

export async function getMongoDb() {
  const mongooseInstance = await dbConnect();
  const db = mongooseInstance.connection.db;
  if (!db) {
    throw new Error("MongoDB Database instance is not initialized on the Mongoose connection.");
  }
  return db;
}
