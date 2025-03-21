
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// For persistent data storage
const dataFilePath = path.join(__dirname, 'server-data.json');

// Initialize data storage
let serverData = {
  news: [],
  admins: [],
  teachers: [],
  achievements: []
};

// Create data directory if it doesn't exist (for Heroku)
const initializeDataStorage = () => {
  try {
    // Load data if exists
    if (fs.existsSync(dataFilePath)) {
      try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        serverData = JSON.parse(fileData);
        console.log('Data loaded from file');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    } else {
      // Save initial empty data structure
      saveData();
      console.log('Created new data file');
    }
  } catch (error) {
    console.error('Error initializing data storage:', error);
  }
};

// Function to save data to file
function saveData() {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(serverData, null, 2));
    console.log('Data saved to file');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Initialize data storage
initializeDataStorage();

// API endpoints for data persistence
app.use(express.json());

// Get all data
app.get('/api/data', (req, res) => {
  res.json(serverData);
});

// Update news
app.post('/api/news', (req, res) => {
  serverData.news = req.body;
  saveData();
  res.json({ success: true });
});

// Update admins
app.post('/api/admins', (req, res) => {
  serverData.admins = req.body;
  saveData();
  res.json({ success: true });
});

// Update teachers
app.post('/api/teachers', (req, res) => {
  serverData.teachers = req.body;
  saveData();
  res.json({ success: true });
});

// Update achievements
app.post('/api/achievements', (req, res) => {
  serverData.achievements = req.body;
  saveData();
  res.json({ success: true });
});

// Handle all other requests by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
