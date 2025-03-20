
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from './AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Dashboard = () => {
  const { admin, isLoading } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // If not logged in, redirect to login
  if (!admin) {
    return <Navigate to="/login-admin" replace />;
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center">
        <Avatar className="h-12 w-12 mr-4">
          {admin.imageUrl ? (
            <AvatarImage src={admin.imageUrl} alt={admin.username} />
          ) : (
            <AvatarFallback className="text-xl">
              {admin.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">Selamat Datang, {admin.username}!</h2>
          <p className="text-muted-foreground">Selamat bekerja dan kelola website dengan baik</p>
        </div>
      </div>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default Dashboard;
