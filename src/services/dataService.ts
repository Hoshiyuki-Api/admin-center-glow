
// Main data service file that re-exports functionality from all domain-specific services

// Re-export types
export type { Admin, News, Teacher, Achievement } from './dataTypes';
export { news, admins, teachers, achievements, formatDate, generateSlug } from './dataTypes';

// Re-export news service functions
export { 
  getNewsBySlug,
  getLatestNews,
  addNews,
  updateNews,
  deleteNews 
} from './newsService';

// Re-export admin service functions
export { 
  authenticateAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin 
} from './adminService';

// Re-export achievement service functions
export { 
  filterAchievements
} from './achievementService';

// Initialization function to load data from server in production
import { isProduction, loadInitialData } from './initService';
export { isProduction };

// Initialize data on app startup
loadInitialData();
