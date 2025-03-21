
# Heroku Deployment Setup

To deploy this application to Heroku and ensure data persistence, follow these steps:

## 1. Install Required Dependencies

Run the following command to install the required dependencies for server-side operation:

```bash
npm install express
```

## 2. Update the Build Command

Make sure your package.json has the correct build command:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "start": "node server.js",
  "heroku-postbuild": "npm run build"
}
```

## 3. Set Up Heroku

1. Install the Heroku CLI if you haven't already:
   ```bash
   npm install -g heroku
   ```

2. Log in to Heroku:
   ```bash
   heroku login
   ```

3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

4. Configure the Node.js version in package.json:
   ```json
   "engines": {
     "node": "18.x"
   }
   ```

5. Commit all changes:
   ```bash
   git add .
   git commit -m "Setup for Heroku deployment"
   ```

6. Push to Heroku:
   ```bash
   git push heroku main
   ```

## 4. Update Import References

In your application, you should now use the data service instead of directly importing from data.ts:

```typescript
// Before:
import { addNews, updateNews, deleteNews } from '@/lib/data';

// After:
import { addNews, updateNews, deleteNews } from '@/services/dataService';
```

This ensures that data operations will be synchronized with the server storage.

## 5. Monitoring and Troubleshooting

- View logs:
  ```bash
  heroku logs --tail
  ```

- Open your deployed app:
  ```bash
  heroku open
  ```

- If you need to restart the app:
  ```bash
  heroku restart
  ```

The data is stored in a JSON file on the server, which persists between app restarts. However, if you deploy a new version of the app, Heroku will create a new filesystem. To handle this, consider using a more permanent storage solution like Heroku Postgres for long-term data persistence.
