
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from './AdminLayout';
import NewsForm from '@/components/admin/NewsForm';
import { news, News } from '@/services/dataService';

const NewsEdit = () => {
  const { admin, isLoading } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<News | undefined>(undefined);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const found = news.find(item => item.id === id);
      setNewsItem(found);
    }
  }, [id]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // If not logged in, redirect to login
  if (!admin) {
    return <Navigate to="/login-admin" replace />;
  }
  
  // If news not found
  if (id && !newsItem) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Berita Tidak Ditemukan</h2>
          <p className="text-gray-600">Berita dengan ID yang Anda cari tidak ditemukan.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Edit Berita</h2>
        <div className="bg-white shadow-md rounded-md p-6">
          {newsItem && <NewsForm news={newsItem} isEdit />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsEdit;
