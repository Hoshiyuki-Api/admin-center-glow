
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { news } from '@/lib/data';
import NewsCard from '@/components/news/NewsCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState(news);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const results = news.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(results);
    } else {
      setFilteredNews(news);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Berita & Kegiatan</h1>
              <p className="text-xl text-white/90 mb-8">
                Informasi terbaru tentang kegiatan, program, dan pencapaian Yayasan Pendidikan kami
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 py-6 rounded-full text-gray-900 border-none bg-white/90 backdrop-blur-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                {searchTerm && (
                  <button 
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* News List */}
        <section className="py-16">
          <div className="container-custom">
            {filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-2">Tidak ada berita ditemukan</h3>
                <p className="text-gray-600 mb-6">Tidak ada berita yang sesuai dengan pencarian Anda.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                >
                  Reset Pencarian
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Featured News (First Item) */}
                <NewsCard news={filteredNews[0]} featured />
                
                {/* Rest of News */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNews.slice(1).map((item) => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
