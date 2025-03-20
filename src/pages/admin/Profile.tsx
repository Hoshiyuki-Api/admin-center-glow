
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from './AdminLayout';
import AdminForm from '@/components/admin/AdminForm';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
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
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Profil Saya</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Info Profil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                {admin.imageUrl ? (
                  <AvatarImage src={admin.imageUrl} alt={admin.username} />
                ) : (
                  <AvatarFallback className="text-4xl">
                    {admin.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="text-xl font-semibold">{admin.username}</h3>
              <p className="text-sm text-muted-foreground">Administrator</p>
              <div className="mt-4 w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bergabung sejak:</span>
                  <span>{new Date(admin.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Terakhir diperbarui:</span>
                  <span>{new Date(admin.updatedAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminForm isProfile />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
