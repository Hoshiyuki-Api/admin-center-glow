
import { v4 as uuidv4 } from 'uuid';
import { News, news, generateSlug } from './dataTypes';

// Check if we're in production (Heroku)
const isProduction = import.meta.env.MODE === 'production';

// News CRUD operations
export const getNewsBySlug = (slug: string): News | undefined => {
  return news.find(item => item.slug === slug);
};

export const getLatestNews = (limit: number = 3): News[] => {
  return [...news]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

export const addNews = (newsData: Omit<News, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): News => {
  const result = {
    id: uuidv4(),
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

// Save news data to server in production
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
      console.log('News data saved to MongoDB');
    } catch (error) {
      console.error('Error saving news data to MongoDB:', error);
    }
  }
}
