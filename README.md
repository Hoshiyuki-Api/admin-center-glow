
# Yayasan Website

## MongoDB Integration

This project uses MongoDB for data persistence. The MongoDB connection string is already configured in the server.js file.

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

5. The MongoDB connection string is already set in server.js, but you can override it with your own if needed:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-connection-string"
   ```

6. Push your code to Heroku:
   ```bash
   git push heroku main
   ```

7. Open your app:
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

The application connects to MongoDB using the connection string provided in the `MONGODB_URI` environment variable or falls back to the connection string hardcoded in server.js.

For local development with a different MongoDB instance:
1. Set the MONGODB_URI environment variable to your connection string
2. Or modify the connection string directly in server.js

## ES Modules

This project uses ES Modules. The server.js file is written using ES Module syntax, and package.json includes `"type": "module"`.
