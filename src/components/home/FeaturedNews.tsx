
import { Link } from 'react-router-dom';
import { News, getLatestNews, formatDate } from '@/services/dataService';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedNews = () => {
  const latestNews = getLatestNews(3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Berita Terbaru</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru dari kegiatan dan pencapaian Yayasan kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/berita" className="inline-flex items-center">
              Lihat Semua Berita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const NewsCard = ({ news }: { news: News }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover-card-animation">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{formatDate(news.createdAt)}</div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
        <Link 
          to={`/berita/${news.slug}`} 
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          Baca selengkapnya
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedNews;
