
import { Achievement, achievements } from './dataTypes';

// Check if we're in production (Heroku)
const isProduction = import.meta.env.MODE === 'production';

export const filterAchievements = (category: 'academic' | 'non-academic' | 'all'): Achievement[] => {
  if (category === 'all') return achievements;
  return achievements.filter(achievement => achievement.category === category);
};

// Save achievements data to server in production
export async function saveAchievementsData() {
  if (isProduction) {
    try {
      await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(achievements),
      });
      console.log('Achievements data saved to MongoDB');
    } catch (error) {
      console.error('Error saving achievements data to MongoDB:', error);
    }
  }
}
