import { MongoClient, Db } from 'mongodb';

declare global {
  // allow global to cache across module reloads in dev
  // eslint-disable-next-line no-var
  var __mongo_cached: { client: MongoClient; db: Db } | undefined;
}

const uri = process.env.MONGODB_URI || '';

if (!uri) {
  // We don't throw here during module load to keep dev server from failing
  // immediately; consumers will check and surface a clearer error.
}

let cached = global.__mongo_cached || null;

export async function connectToDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set. See .env.example');
  }

  if (cached) {
    return cached;
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  cached = { client, db };
  global.__mongo_cached = cached;
  return cached;
}

export type DbClient = { client: MongoClient; db: Db };
