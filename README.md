
# Yayasan Website

## MongoDB Integration

This project now uses MongoDB for data persistence. This ensures that data is retained even when the Heroku dyno restarts or a new version is deployed.

## Deployment to Heroku

1. Create a Heroku account if you don't have one.
2. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```

3. Log in to Heroku:
   ```bash
   heroku login
   ```

4. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

5. Set up MongoDB by following the instructions in `mongodb-setup.md`.

6. Add the MongoDB URI to your Heroku config:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-connection-string"
   ```

7. Push your code to Heroku:
   ```bash
   git push heroku main
   ```

8. Open your app:
   ```bash
   heroku open
   ```

## Building the Project

To create the `dist` directory for production:

```bash
npm run build
```

This will generate optimized static files in the `dist` directory which will be served by the Express server.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. For production mode locally:
   ```bash
   npm run build
   node server.js
   ```

## MongoDB Connection

The application connects to MongoDB using the connection string provided in the `MONGODB_URI` environment variable. If this variable is not set, it will default to `mongodb://localhost:27017/yayasanApp`.

For local development with MongoDB:
1. Install MongoDB Community Edition
2. Start the MongoDB service
3. The application will automatically connect to the local MongoDB instance
