
import { useState, useEffect } from 'react';
import { News, formatDate } from '@/lib/data';
import { Calendar, User } from 'lucide-react';

interface NewsDetailProps {
  news: News;
}

const NewsDetail = ({ news }: NewsDetailProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <article className={`max-w-4xl mx-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
        <div className="flex flex-wrap items-center text-gray-500 gap-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(news.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{news.author}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden mb-8">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-auto object-cover"
        />
      </div>

      <div 
        className="prose prose-lg max-w-none" 
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </article>
  );
};

export default NewsDetail;
