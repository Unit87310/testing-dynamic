const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

if (!uri.startsWith('mongodb')) {
  throw new Error('Invalid MONGODB_URI format - must start with mongodb:// or mongodb+srv://');
}

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