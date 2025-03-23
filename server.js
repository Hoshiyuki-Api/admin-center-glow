
const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB Connection URI - use provided connection string, falling back to localhost if not available
const uri = process.env.MONGODB_URI || "mongodb+srv://Hoshiyuki:@mm4rGans@cluster0.crooj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Database and collections
let db;
let collections = {
  news: null,
  admins: null,
  teachers: null,
  achievements: null
};

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");
    
    // Get database reference
    db = client.db("yayasanApp");
    
    // Initialize collections
    collections.news = db.collection("news");
    collections.admins = db.collection("admins");
    collections.teachers = db.collection("teachers");
    collections.achievements = db.collection("achievements");
    
    // Create indexes if needed
    await collections.news.createIndex({ slug: 1 }, { unique: true });
    
    // Initialize data if collections are empty
    await initializeDataIfEmpty();
    
    console.log("Database setup complete!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Initialize data if collections are empty
async function initializeDataIfEmpty() {
  try {
    // Check if news collection is empty
    const newsCount = await collections.news.countDocuments();
    if (newsCount === 0) {
      // Import initial data from data.ts (this will be transformed to match MongoDB format)
      try {
        const { news, admins, teachers, achievements } = require('./src/lib/data');
        
        // Convert Date objects to ISOString for MongoDB compatibility
        const processedNews = news.map(item => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt)
        }));
        
        const processedAdmins = admins.map(item => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt)
        }));
        
        const processedAchievements = achievements.map(item => ({
          ...item,
          date: new Date(item.date)
        }));
        
        // Insert initial data if collections are empty
        if (newsCount === 0 && processedNews.length > 0) {
          await collections.news.insertMany(processedNews);
          console.log("Initialized news data");
        }
        
        const adminsCount = await collections.admins.countDocuments();
        if (adminsCount === 0 && processedAdmins.length > 0) {
          await collections.admins.insertMany(processedAdmins);
          console.log("Initialized admins data");
        }
        
        const teachersCount = await collections.teachers.countDocuments();
        if (teachersCount === 0 && teachers.length > 0) {
          await collections.teachers.insertMany(teachers);
          console.log("Initialized teachers data");
        }
        
        const achievementsCount = await collections.achievements.countDocuments();
        if (achievementsCount === 0 && processedAchievements.length > 0) {
          await collections.achievements.insertMany(processedAchievements);
          console.log("Initialized achievements data");
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    }
  } catch (error) {
    console.error("Error checking collection status:", error);
  }
}

// API endpoints
// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const news = await collections.news.find({}).toArray();
    const admins = await collections.admins.find({}).toArray();
    const teachers = await collections.teachers.find({}).toArray();
    const achievements = await collections.achievements.find({}).toArray();
    
    res.json({ news, admins, teachers, achievements });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Update news
app.post('/api/news', async (req, res) => {
  try {
    // Delete all existing news
    await collections.news.deleteMany({});
    
    // Insert new news array
    if (req.body && req.body.length > 0) {
      await collections.news.insertMany(req.body);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ error: "Failed to update news" });
  }
});

// Update admins
app.post('/api/admins', async (req, res) => {
  try {
    // Delete all existing admins
    await collections.admins.deleteMany({});
    
    // Insert new admins array
    if (req.body && req.body.length > 0) {
      await collections.admins.insertMany(req.body);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating admins:", error);
    res.status(500).json({ error: "Failed to update admins" });
  }
});

// Update teachers
app.post('/api/teachers', async (req, res) => {
  try {
    // Delete all existing teachers
    await collections.teachers.deleteMany({});
    
    // Insert new teachers array
    if (req.body && req.body.length > 0) {
      await collections.teachers.insertMany(req.body);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating teachers:", error);
    res.status(500).json({ error: "Failed to update teachers" });
  }
});

// Update achievements
app.post('/api/achievements', async (req, res) => {
  try {
    // Delete all existing achievements
    await collections.achievements.deleteMany({});
    
    // Insert new achievements array
    if (req.body && req.body.length > 0) {
      await collections.achievements.insertMany(req.body);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating achievements:", error);
    res.status(500).json({ error: "Failed to update achievements" });
  }
});

// Handle all other requests by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Connect to MongoDB before starting the server
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(console.error);

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});
