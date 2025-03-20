
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsDetailComponent from '@/components/news/NewsDetail';
import { getNewsBySlug, getLatestNews, News } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | undefined>(undefined);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug) {
      const newsItem = getNewsBySlug(slug);
      setNews(newsItem);
      
      if (!newsItem) {
        // News not found
        setTimeout(() => {
          navigate('/berita', { replace: true });
        }, 3000);
      } else {
        // Get related news (excluding current news)
        const latest = getLatestNews(4).filter(item => item.id !== newsItem.id).slice(0, 3);
        setRelatedNews(latest);
      }
    }
  }, [slug, navigate]);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Berita tidak ditemukan</h1>
            <p className="text-gray-600 mb-6">Berita yang Anda cari tidak ditemukan atau telah dihapus.</p>
            <p className="text-gray-600 mb-6">Anda akan dialihkan ke halaman berita dalam beberapa detik.</p>
            <Button asChild>
              <Link to="/berita">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Berita
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4 border-b">
          <div className="container-custom">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-primary">Beranda</Link>
              <ChevronRight className="mx-2 h-4 w-4" />
              <Link to="/berita" className="hover:text-primary">Berita</Link>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span className="text-gray-900 font-medium truncate">{news.title}</span>
            </div>
          </div>
        </div>
        
        {/* News Detail */}
        <section className="py-12">
          <div className="container-custom">
            <NewsDetailComponent news={news} />
          </div>
        </section>
        
        {/* Related News */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Berita Terkait</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover-card-animation">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>
                    <Link 
                      to={`/berita/${item.slug}`} 
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      Baca selengkapnya
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/berita" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Semua Berita
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;
