
# MongoDB Atlas Setup Guide for Heroku Deployment

## 1. Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a new project.
3. Build a new cluster (the free tier is sufficient for getting started).

## 2. Connect to Your Cluster

After your cluster is created, you'll need to configure security and create database access credentials:

### Step 1: Set up connection security

You have three options to secure your MongoDB Atlas cluster:
- **Add Your Current IP Address**: Allows connections only from your current location
- **Add a Different IP Address**: Allows connections from a specific IP address
- **Allow Access from Anywhere**: Allows connections from any IP address (less secure, but useful for Heroku which has dynamic IPs)

For Heroku deployment, select **Allow Access from Anywhere**, as Heroku uses dynamic IP addresses.

### Step 2: Create a database user

1. Create a database username and password. This is what your application will use to connect.
2. This first user will have `atlasAdmin` permissions for your project.
3. **IMPORTANT**: Make sure to save these credentials somewhere secure - you'll need them for your connection string.

## 3. Choose a Connection Method

1. After setting up security, click "Choose a connection method"
2. Select "Connect your application"
3. Choose your driver and version (Node.js and the latest version)
4. Copy the connection string provided

## 4. Format Your Connection String

The connection string will look something like this:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Make sure to:
1. Replace `<username>` with your database username
2. Replace `<password>` with your database password
3. Add your database name after the hostname (e.g., `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yayasanApp?retryWrites=true&w=majority`)

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
