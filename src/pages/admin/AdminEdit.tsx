
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from './AdminLayout';
import AdminForm from '@/components/admin/AdminForm';
import { admins, Admin } from '@/lib/data';

const AdminEdit = () => {
  const { admin, isLoading } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [adminData, setAdminData] = useState<Admin | undefined>(undefined);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const found = admins.find(item => item.id === id);
      setAdminData(found);
    }
  }, [id]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // If not logged in, redirect to login
  if (!admin) {
    return <Navigate to="/login-admin" replace />;
  }
  
  // If admin not found
  if (id && !adminData) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Admin Tidak Ditemukan</h2>
          <p className="text-gray-600">Admin dengan ID yang Anda cari tidak ditemukan.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Edit Admin</h2>
        <div className="bg-white shadow-md rounded-md p-6">
          {adminData && <AdminForm adminData={adminData} isEdit />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEdit;
