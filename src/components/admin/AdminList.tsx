
import { useState } from 'react';
import { Admin, admins, deleteAdmin } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const AdminList = () => {
  const { admin: currentAdmin } = useAuth();
  const [adminList, setAdminList] = useState<Admin[]>(admins);

  const handleDelete = (adminId: string) => {
    if (adminId === currentAdmin?.id) {
      toast({
        title: 'Tidak dapat menghapus',
        description: 'Anda tidak dapat menghapus akun yang sedang digunakan',
        variant: 'destructive',
      });
      return;
    }

    const result = deleteAdmin(adminId);
    if (result) {
      // Update the local state
      setAdminList(adminList.filter(admin => admin.id !== adminId));
      toast({
        title: 'Admin dihapus',
        description: 'Admin telah berhasil dihapus dari sistem',
      });
    } else {
      toast({
        title: 'Gagal menghapus',
        description: 'Admin tidak dapat dihapus',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daftar Admin</h2>
        <Button asChild>
          <Link to="/admin/manage-admins/create">
            <UserPlus className="mr-2 h-4 w-4" />
            Tambah Admin
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Terdaftar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Admin</th>
                  <th className="text-left py-3 px-4 font-medium">Tanggal Dibuat</th>
                  <th className="text-left py-3 px-4 font-medium">Terakhir Diperbarui</th>
                  <th className="text-right py-3 px-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((admin) => (
                  <tr key={admin.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          {admin.imageUrl ? (
                            <AvatarImage src={admin.imageUrl} alt={admin.username} />
                          ) : (
                            <AvatarFallback>
                              {admin.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {admin.username}
                            {admin.id === currentAdmin?.id && (
                              <span className="ml-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                                Anda
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(admin.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(admin.updatedAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                        >
                          <Link to={`/admin/manage-admins/edit/${admin.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              disabled={admin.id === currentAdmin?.id}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Admin</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus admin "{admin.username}"? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(admin.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminList;
