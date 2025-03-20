
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { News, getLatestNews, admins } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, FileText, Users, Edit, Newspaper, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If not logged in, redirect to login
    if (!admin) {
      navigate('/login-admin');
      return;
    }
    
    // Fetch latest news
    setLatestNews(getLatestNews(5));
    setIsLoading(false);
  }, [admin, navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <section>
        <h2 className="text-3xl font-bold mb-6">Dashboard Admin</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Berita</CardTitle>
              <CardDescription>Jumlah berita yang dipublikasikan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Newspaper className="h-10 w-10 text-primary" />
                <span className="text-3xl font-bold">{latestNews.length}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/news">
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat Semua
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Admin</CardTitle>
              <CardDescription>Jumlah admin terdaftar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="h-10 w-10 text-primary" />
                <span className="text-3xl font-bold">{admins.length}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/manage-admins">
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat Semua
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Aktivitas</CardTitle>
              <CardDescription>Aktivitas terbaru admin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Activity className="h-10 w-10 text-primary" />
                <span className="text-xl font-medium">Aktif</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/profile">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profil
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Berita Terbaru</h3>
          <Button asChild>
            <Link to="/admin/news/create">
              Tambah Berita Baru
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-medium">Judul</th>
                  <th className="text-left py-4 px-6 font-medium hidden md:table-cell">Tanggal</th>
                  <th className="text-left py-4 px-6 font-medium hidden lg:table-cell">Penulis</th>
                  <th className="text-right py-4 px-6 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {latestNews.map((news) => (
                  <tr key={news.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="font-medium line-clamp-1">{news.title}</div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      {new Date(news.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      {news.author}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/admin/news/edit/${news.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/berita/${news.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="border-t">
            <Button asChild variant="ghost" size="sm" className="ml-auto">
              <Link to="/admin/news">
                Lihat Semua Berita
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
