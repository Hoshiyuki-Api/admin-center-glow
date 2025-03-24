
import { news, admins, teachers, achievements } from './dataTypes';

// Check if we're in production (Heroku)
export const isProduction = import.meta.env.MODE === 'production';

// Function to load initial data from server in production
export async function loadInitialData() {
  if (isProduction) {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      
      // Only update if we got valid data from the server
      if (data.news && data.news.length > 0) {
        // Convert date strings back to Date objects
        const processedNews = data.news.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt)
        }));
        news.splice(0, news.length, ...processedNews);
      }
      
      if (data.admins && data.admins.length > 0) {
        const processedAdmins = data.admins.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt)
        }));
        admins.splice(0, admins.length, ...processedAdmins);
      }
      
      if (data.teachers && data.teachers.length > 0) {
        teachers.splice(0, teachers.length, ...data.teachers);
      }
      
      if (data.achievements && data.achievements.length > 0) {
        const processedAchievements = data.achievements.map((item: any) => ({
          ...item,
          date: new Date(item.date)
        }));
        achievements.splice(0, achievements.length, ...processedAchievements);
      }
      
      console.log('Data loaded from server');
    } catch (error) {
      console.error('Error loading data from server:', error);
    }
  }
}
