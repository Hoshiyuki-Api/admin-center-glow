
import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedNews from '@/components/home/FeaturedNews';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Award, UserCheck, BarChart } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: 'Pendidikan Berkualitas',
      description: 'Kurikulum terpadu dan metode pembelajaran inovatif untuk mengembangkan potensi siswa secara maksimal.'
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: 'Prestasi Unggul',
      description: 'Berbagai pencapaian akademik dan non-akademik di tingkat daerah, nasional, hingga internasional.'
    },
    {
      icon: <UserCheck className="h-12 w-12 text-primary" />,
      title: 'Tenaga Pengajar Profesional',
      description: 'Didukung oleh pengajar berpengalaman dan berkualifikasi tinggi di bidangnya.'
    },
    {
      icon: <BarChart className="h-12 w-12 text-primary" />,
      title: 'Fasilitas Modern',
      description: 'Lingkungan belajar yang nyaman dengan fasilitas modern untuk mendukung kegiatan pembelajaran.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Memilih Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami berkomitmen untuk memberikan pendidikan terbaik dengan pendekatan holistik
                yang mengembangkan aspek akademik, karakter, dan keterampilan sosial.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-sm hover-card-animation flex flex-col items-center text-center"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedNews />
        
        {/* Call to Action */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bergabunglah dengan Komunitas Kami</h2>
              <p className="text-white/80 text-lg mb-8">
                Jadilah bagian dari perjalanan pendidikan yang menginspirasi dan memberdayakan.
                Kami membantu siswa mencapai potensi terbaik mereka dan menjadi pemimpin masa depan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="text-primary">
                  <Link to="/hubungi-kami">
                    Hubungi Kami
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  <Link to="/tentang-kami">
                    Pelajari Lebih Lanjut
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
