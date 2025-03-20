
import { News, formatDate } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  news: News;
  featured?: boolean;
}

const NewsCard = ({ news, featured = false }: NewsCardProps) => {
  if (featured) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row hover-card-animation">
        <div className="md:w-1/2">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-2">{formatDate(news.createdAt)}</div>
          <h3 className="text-2xl font-bold mb-3">{news.title}</h3>
          <p className="text-gray-600 mb-4">{news.excerpt}</p>
          <div className="mt-auto">
            <Link 
              to={`/berita/${news.slug}`} 
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Baca selengkapnya
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

export default NewsCard;
