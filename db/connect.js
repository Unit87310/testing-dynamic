const { MongoClient, ServerApiVersion } = require('mongodb');

const db = dbClient.db(process.env.DB_NAME || 'Cluster0');

const uri = process.env.MONGODB_URI;
let client;

async function connectToDatabase() {
  if (client) return client;
  
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };