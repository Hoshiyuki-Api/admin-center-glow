
// Common types used across services
export interface Admin {
  id: string;
  username: string;
  password: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

export interface Teacher {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  education: string;
  bio: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
  category: 'academic' | 'non-academic';
}

// Export data arrays from lib/data for services to use
import { 
  news as dataNews, 
  admins as dataAdmins, 
  teachers as dataTeachers, 
  achievements as dataAchievements 
} from '@/lib/data';

// Mutable data arrays that services can modify
export const news = dataNews;
export const admins = dataAdmins;
export const teachers = dataTeachers;
export const achievements = dataAchievements;

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};
