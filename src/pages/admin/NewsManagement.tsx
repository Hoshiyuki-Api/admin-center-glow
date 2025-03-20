
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from './AdminLayout';
import { news, deleteNews, News as NewsType } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Edit, Eye } from 'lucide-react';

const NewsManagement = () => {
  const { admin, isLoading } = useAuth();
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setNewsList([...news].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }, []);
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // If not logged in, redirect to login
  if (!admin) {
    return <Navigate to="/login-admin" replace />;
  }
  
  const handleDelete = (id: string) => {
    const success = deleteNews(id);
    
    if (success) {
      setNewsList(newsList.filter(item => item.id !== id));
      toast({
        title: 'Berita dihapus',
        description: 'Berita telah berhasil dihapus',
      });
    } else {
      toast({
        title: 'Gagal menghapus',
        description: 'Berita tidak dapat dihapus',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Kelola Berita</h2>
          <Button asChild>
            <Link to="/admin/news/create">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Berita Baru
            </Link>
          </Button>
        </div>
        
        <div className="bg-white shadow rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Tidak ada berita untuk ditampilkan
                  </TableCell>
                </TableRow>
              ) : (
                newsList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/admin/news/edit/${item.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/berita/${item.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Berita</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus berita "{item.title}"? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(item.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsManagement;
