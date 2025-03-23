import express from 'express';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors'; // Tambahkan jika API diakses dari frontend berbeda

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Gunakan connection string yang benar
const uri = process.env.MONGODB_URI || "mongodb+srv://Hoshiyuki:@mm4rGans@cluster0.crooj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(cors()); // Jika diperlukan
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Database dan collections
let db;
let collections = {
  news: null,
  admins: null,
  teachers: null,
  achievements: null
};

// Koneksi ke MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    db = client.db("yayasanApp");

    // Inisialisasi collections
    collections.news = db.collection("news");
    collections.admins = db.collection("admins");
    collections.teachers = db.collection("teachers");
    collections.achievements = db.collection("achievements");

    // Pastikan collections sudah tersedia sebelum akses
    if (!collections.news || !collections.admins || !collections.teachers || !collections.achievements) {
      throw new Error("❌ Collections not initialized correctly!");
    }

    console.log("✅ Database setup complete!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Stop server jika koneksi gagal
  }
}

// API Endpoint: Get all data
app.get('/api/data', async (req, res) => {
  try {
    if (!collections.news || !collections.admins || !collections.teachers || !collections.achievements) {
      return res.status(500).json({ error: "Database not connected" });
    }

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

// API Endpoint: Update news
app.post('/api/news', async (req, res) => {
  try {
    if (!collections.news) return res.status(500).json({ error: "Database not connected" });

    await collections.news.deleteMany({});
    if (req.body && req.body.length > 0) {
      await collections.news.insertMany(req.body);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ error: "Failed to update news" });
  }
});

// API Endpoint: Update admins
app.post('/api/admins', async (req, res) => {
  try {
    if (!collections.admins) return res.status(500).json({ error: "Database not connected" });

    await collections.admins.deleteMany({});
    if (req.body && req.body.length > 0) {
      await collections.admins.insertMany(req.body);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating admins:", error);
    res.status(500).json({ error: "Failed to update admins" });
  }
});

// API Endpoint: Update teachers
app.post('/api/teachers', async (req, res) => {
  try {
    if (!collections.teachers) return res.status(500).json({ error: "Database not connected" });

    await collections.teachers.deleteMany({});
    if (req.body && req.body.length > 0) {
      await collections.teachers.insertMany(req.body);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating teachers:", error);
    res.status(500).json({ error: "Failed to update teachers" });
  }
});

// API Endpoint: Update achievements
app.post('/api/achievements', async (req, res) => {
  try {
    if (!collections.achievements) return res.status(500).json({ error: "Database not connected" });

    await collections.achievements.deleteMany({});
    if (req.body && req.body.length > 0) {
      await collections.achievements.insertMany(req.body);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating achievements:", error);
    res.status(500).json({ error: "Failed to update achievements" });
  }
});

// Serve index.html untuk semua request yang tidak cocok
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Jalankan server setelah koneksi MongoDB sukses
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch(console.error);

// Handle shutdown agar koneksi MongoDB tertutup dengan aman
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
