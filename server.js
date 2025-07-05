require('dotenv').config({ path: __dirname + '/.env' }); // Absolute path
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI); // Debug line

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db/connect');

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    // 1. First connect to database
    const dbClient = await connectToDatabase();
    const db = dbClient.db(process.env.DB_NAME || 'Cluster0');
    
    // 2. Then set up routes
    app.get('/', (req, res) => {
      res.send('Server is running');
    });

    app.get('/users', async (req, res) => {
      try {
        const users = await db.collection('users').find().toArray();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 3. Finally start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();