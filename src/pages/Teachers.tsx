
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { teachers } from '@/lib/data';
import { Mail } from 'lucide-react';

const Teachers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-3xl animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Profil Guru</h1>
              <p className="text-xl text-gray-600">
                Mengenal lebih dekat tenaga pengajar profesional dan berpengalaman yang membimbing 
                siswa-siswi kami untuk meraih prestasi dan mengembangkan potensi mereka.
              </p>
            </div>
          </div>
        </section>
        
        {/* Teachers Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover-card-animation">
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={teacher.imageUrl} 
                      alt={teacher.name} 
                      className="object-cover w-full h-64"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>
                    <p className="text-primary font-medium mb-3">{teacher.position}</p>
                    <p className="text-gray-600 mb-4">{teacher.bio}</p>
                    <div className="text-sm text-gray-500">
                      <p className="mb-2"><strong>Pendidikan:</strong> {teacher.education}</p>
                      <a 
                        href={`mailto:${teacher.name.toLowerCase().replace(' ', '.')}@yayasanpendidikan.ac.id`} 
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <Mail className="mr-1 h-4 w-4" />
                        Hubungi
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Bergabung dengan Tim Kami</h2>
              <p className="text-gray-600 mb-8">
                Kami selalu mencari pendidik berbakat dan berdedikasi untuk bergabung dengan tim kami.
                Jika Anda memiliki passion dalam dunia pendidikan dan ingin membuat perbedaan dalam 
                kehidupan para siswa, kami mengundang Anda untuk bergabung.
              </p>
              <a 
                href="mailto:karir@yayasanpendidikan.ac.id" 
                className="inline-flex items-center justify-center text-white bg-primary hover:bg-primary/90 py-2 px-6 rounded-md font-medium transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Kirim Lamaran
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Teachers;
