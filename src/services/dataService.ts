
import { news, admins, teachers, achievements, News, Admin, Teacher, Achievement } from '@/lib/data';

// Check if we're in production (Heroku)
const isProduction = import.meta.env.MODE === 'production';

// Function to load initial data from server in production
async function loadInitialData() {
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

// Function to save news data to server in production
async function saveNewsData() {
  if (isProduction) {
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(news),
      });
      console.log('News data saved to server');
    } catch (error) {
      console.error('Error saving news data to server:', error);
    }
  }
}

// Function to save admins data to server in production
async function saveAdminsData() {
  if (isProduction) {
    try {
      await fetch('/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admins),
      });
      console.log('Admins data saved to server');
    } catch (error) {
      console.error('Error saving admins data to server:', error);
    }
  }
}

// Function to save teachers data to server in production
async function saveTeachersData() {
  if (isProduction) {
    try {
      await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teachers),
      });
      console.log('Teachers data saved to server');
    } catch (error) {
      console.error('Error saving teachers data to server:', error);
    }
  }
}

// Function to save achievements data to server in production
async function saveAchievementsData() {
  if (isProduction) {
    try {
      await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(achievements),
      });
      console.log('Achievements data saved to server');
    } catch (error) {
      console.error('Error saving achievements data to server:', error);
    }
  }
}

// Modified functions from data.ts to include server persistence
export const addNews = (newsData: Omit<News, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): News => {
  const result = {
    id: crypto.randomUUID(),
    slug: generateSlug(newsData.title),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...newsData
  };
  
  news.push(result);
  saveNewsData();
  return result;
};

export const updateNews = (id: string, newsData: Partial<Omit<News, 'id' | 'createdAt' | 'updatedAt'>>): News | null => {
  const index = news.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  const updatedNews = {
    ...news[index],
    ...newsData,
    updatedAt: new Date(),
    slug: newsData.title ? generateSlug(newsData.title) : news[index].slug
  };
  
  news[index] = updatedNews;
  saveNewsData();
  return updatedNews;
};

export const deleteNews = (id: string): boolean => {
  const index = news.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  news.splice(index, 1);
  saveNewsData();
  return true;
};

export const addAdmin = (adminData: { username: string; password: string; imageUrl?: string }): Admin => {
  const newAdmin: Admin = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...adminData
  };
  
  admins.push(newAdmin);
  saveAdminsData();
  return newAdmin;
};

export const updateAdmin = (id: string, adminData: Partial<Omit<Admin, 'id' | 'createdAt' | 'updatedAt'>>): Admin | null => {
  const index = admins.findIndex(admin => admin.id === id);
  if (index === -1) return null;
  
  const updatedAdmin = {
    ...admins[index],
    ...adminData,
    updatedAt: new Date()
  };
  
  admins[index] = updatedAdmin;
  saveAdminsData();
  return updatedAdmin;
};

export const deleteAdmin = (id: string): boolean => {
  const index = admins.findIndex(admin => admin.id === id);
  if (index === -1) return false;
  
  admins.splice(index, 1);
  saveAdminsData();
  return true;
};

// Helper function from data.ts
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

// Initialize data on app startup
loadInitialData();

// Export other necessary functions from data.ts
export {
  news,
  admins,
  teachers,
  achievements,
  getNewsBySlug,
  getLatestNews,
  formatDate,
  filterAchievements,
  authenticateAdmin
};
