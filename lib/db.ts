import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
if (!uri) {
  // defer throw until used to allow dev without env set
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  if (!clientPromise) throw new Error("MONGODB_URI not configured");
  const c = await clientPromise;
  return c.db();
}
