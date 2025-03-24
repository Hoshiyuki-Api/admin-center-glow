
import { Teacher, teachers } from './dataTypes';

// Check if we're in production (Heroku)
const isProduction = import.meta.env.MODE === 'production';

// Save teachers data to server in production
export async function saveTeachersData() {
  if (isProduction) {
    try {
      await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teachers),
      });
      console.log('Teachers data saved to MongoDB');
    } catch (error) {
      console.error('Error saving teachers data to MongoDB:', error);
    }
  }
}
