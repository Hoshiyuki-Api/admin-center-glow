
# MongoDB Setup Guide for Heroku Deployment

## 1. Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a new project.
3. Build a new cluster (the free tier is sufficient for getting started).

## 2. Configure Database Access

1. In the MongoDB Atlas dashboard, go to "Database Access" under Security.
2. Click "Add New Database User".
3. Create a username and password. Make sure to remember these credentials.
4. Set appropriate privileges (at minimum "Read and Write to Any Database").
5. Click "Add User".

## 3. Configure Network Access

1. Go to "Network Access" under Security.
2. Click "Add IP Address".
3. For development, you can click "Allow Access from Anywhere" (or add specific IP addresses for better security).
4. Click "Confirm".

## 4. Get Your Connection String

1. Go to "Clusters" and click "Connect" on your cluster.
2. Choose "Connect your application".
3. Copy the connection string.
4. Replace `<password>` in the connection string with your database user password.

## 5. Add MongoDB to Heroku

1. Log in to your Heroku dashboard.
2. Select your application.
3. Go to "Settings" tab.
4. Click "Reveal Config Vars".
5. Add a new config var:
   - KEY: `MONGODB_URI`
   - VALUE: Your MongoDB Atlas connection string (from step 4)

## 6. Deploy Your Application

1. Make sure your code is committed to Git:
   ```bash
   git add .
   git commit -m "Implement MongoDB integration"
   ```

2. Push to Heroku:
   ```bash
   git push heroku main
   ```

## 7. Verify Connection

1. Check your Heroku logs to make sure the connection is successful:
   ```bash
   heroku logs --tail
   ```

2. You should see log messages indicating a successful connection to MongoDB.

## Troubleshooting

- If you encounter connection issues, verify that:
  - Your MongoDB Atlas cluster is running
  - Your IP whitelist includes Heroku's IPs (or is set to allow all IPs)
  - Your database username and password are correct in the connection string
  - You've set the MONGODB_URI environment variable correctly in Heroku

- For connection timeout issues, ensure your MongoDB Atlas cluster is deployed in a region close to your Heroku application's region.
