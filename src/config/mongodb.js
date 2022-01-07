import { MongoClient } from "mongodb";
import { env } from "*/config/env";

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // connect client to server
  await client.connect();
  //assign clientDB to dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};
// Get databaseInstance
export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to databse first");
  return dbInstance;
};

// const listDatabase = async (client) => {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log(databasesList);
//   console.log("Your Databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// };
