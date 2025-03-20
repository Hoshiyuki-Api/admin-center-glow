
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from './AdminLayout';
import AdminList from '@/components/admin/AdminList';

const AdminManagement = () => {
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
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Kelola Admin</h2>
        <div className="bg-white shadow-md rounded-md p-6">
          <AdminList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminManagement;
