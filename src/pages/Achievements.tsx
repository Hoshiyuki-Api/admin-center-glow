
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { filterAchievements, Achievement, formatDate } from '@/lib/data';
import { Award, Calendar } from 'lucide-react';

const Achievements = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('kategori') as 'academic' | 'non-academic' | 'all' || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState<'academic' | 'non-academic' | 'all'>(initialCategory);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);
  
  useEffect(() => {
    setAchievements(filterAchievements(selectedCategory));
    
    // Update URL without reloading page
    const newUrl = selectedCategory === 'all' 
      ? '/prestasi' 
      : `/prestasi?kategori=${selectedCategory}`;
      
    window.history.pushState({}, '', newUrl);
  }, [selectedCategory]);
  
  const changeCategory = (category: 'academic' | 'non-academic' | 'all') => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-3xl animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Prestasi</h1>
              <p className="text-xl text-white/90">
                Berbagai pencapaian yang telah diraih oleh siswa dan lembaga kami, 
                sebagai bukti komitmen kami terhadap pendidikan berkualitas.
              </p>
            </div>
          </div>
        </section>
        
        {/* Category Filter */}
        <section className="bg-white py-8 shadow-sm">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => changeCategory('all')}
                className="min-w-[120px]"
              >
                Semua
              </Button>
              <Button 
                variant={selectedCategory === 'academic' ? 'default' : 'outline'}
                onClick={() => changeCategory('academic')}
                className="min-w-[120px]"
              >
                Akademik
              </Button>
              <Button 
                variant={selectedCategory === 'non-academic' ? 'default' : 'outline'}
                onClick={() => changeCategory('non-academic')}
                className="min-w-[120px]"
              >
                Non-Akademik
              </Button>
            </div>
          </div>
        </section>
        
        {/* Achievements List */}
        <section className="py-16">
          <div className="container-custom">
            {achievements.length === 0 ? (
              <div className="text-center py-16">
                <Award className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Belum Ada Prestasi</h3>
                <p className="text-gray-600">Belum ada prestasi untuk kategori ini</p>
              </div>
            ) : (
              <div className="space-y-12">
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover-card-animation">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4">
          <img 
            src={achievement.imageUrl} 
            alt={achievement.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-8 p-6 md:p-8">
          <div className="mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              achievement.category === 'academic' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {achievement.category === 'academic' ? 'Akademik' : 'Non-Akademik'}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3">{achievement.title}</h3>
          <div className="flex items-center text-gray-500 mb-4">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(achievement.date)}</span>
          </div>
          <p className="text-gray-700">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
