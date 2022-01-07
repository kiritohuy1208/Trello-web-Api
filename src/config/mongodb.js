import { MongoClient } from "mongodb";
import { env } from "*/config/env";

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log("Connected successfully to server");
    await listDatabase(client);
  } finally {
    await client.close();
  }
};

const listDatabase = async (client) => {
  const databasesList = await client.db().admin().listDatabases();
  console.log(databasesList);
  console.log("Your Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};
