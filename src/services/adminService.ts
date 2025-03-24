
import { v4 as uuidv4 } from 'uuid';
import { Admin, admins } from './dataTypes';

// Check if we're in production (Heroku)
const isProduction = import.meta.env.MODE === 'production';

export const authenticateAdmin = (username: string, password: string): Admin | null => {
  const admin = admins.find(
    admin => admin.username === username && admin.password === password
  );
  return admin || null;
};

export const addAdmin = (adminData: { username: string; password: string; imageUrl?: string }): Admin => {
  const newAdmin: Admin = {
    id: uuidv4(),
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

// Save admins data to server in production
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
      console.log('Admins data saved to MongoDB');
    } catch (error) {
      console.error('Error saving admins data to MongoDB:', error);
    }
  }
}
