
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Admin, authenticateAdmin, updateAdmin } from '@/lib/data';

interface AuthContextType {
  admin: Admin | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: { username?: string; password?: string; imageUrl?: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error('Error parsing stored admin', error);
        localStorage.removeItem('admin');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const authenticatedAdmin = authenticateAdmin(username, password);
      
      if (authenticatedAdmin) {
        setAdmin(authenticatedAdmin);
        // Store admin in localStorage (in real app, store just the token)
        localStorage.setItem('admin', JSON.stringify(authenticatedAdmin));
        toast({
          title: 'Login berhasil',
          description: `Selamat datang, ${authenticatedAdmin.username}!`,
        });
        return true;
      } else {
        toast({
          title: 'Login gagal',
          description: 'Username atau password salah',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Terjadi kesalahan',
        description: 'Tidak dapat melakukan login. Silakan coba lagi.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    toast({
      title: 'Logout berhasil',
      description: 'Anda telah keluar dari sistem',
    });
  };

  const updateProfile = async (data: { username?: string; password?: string; imageUrl?: string }): Promise<boolean> => {
    if (!admin) return false;
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedAdmin = updateAdmin(admin.id, data);
      
      if (updatedAdmin) {
        setAdmin(updatedAdmin);
        localStorage.setItem('admin', JSON.stringify(updatedAdmin));
        toast({
          title: 'Profil diperbarui',
          description: 'Informasi profil anda telah diperbarui',
        });
        return true;
      } else {
        toast({
          title: 'Gagal memperbarui',
          description: 'Tidak dapat memperbarui profil',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast({
        title: 'Terjadi kesalahan',
        description: 'Tidak dapat memperbarui profil. Silakan coba lagi.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
