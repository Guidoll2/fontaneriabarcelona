import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Only initialize MongoDB connection if URI is provided
if (uri && uri.startsWith("mongodb")) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  if (!uri || !uri.startsWith("mongodb")) {
    throw new Error("MONGODB_URI not configured or invalid");
  }
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  const c = await clientPromise;
  return c.db();
}
