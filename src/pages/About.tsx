
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
              <p className="text-xl text-gray-600">
                Mengenal lebih dekat Yayasan Pendidikan kami dan komitmen kami dalam 
                membangun generasi unggul.
              </p>
            </div>
          </div>
        </section>
        
        {/* History Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Sejarah Kami</h2>
                <p className="text-gray-700 mb-4">
                  Yayasan Pendidikan kami didirikan pada tahun 1985 oleh sekelompok pendidik bervisi yang 
                  percaya pada pendidikan berkualitas untuk semua. Berawal dari sebuah bangunan sederhana dengan hanya 
                  beberapa ruang kelas dan puluhan siswa, kami terus bertumbuh dan berkembang.
                </p>
                <p className="text-gray-700 mb-4">
                  Selama lebih dari tiga dekade, yayasan kami telah berkontribusi dalam dunia pendidikan 
                  dengan menghasilkan lulusan berkualitas yang kini telah berkarya di berbagai bidang dan 
                  tingkatan, baik di dalam maupun luar negeri.
                </p>
                <p className="text-gray-700">
                  Saat ini, kami mengelola beberapa unit pendidikan mulai dari tingkat dasar hingga menengah 
                  atas, dengan fasilitas modern dan metode pembelajaran inovatif yang terus dikembangkan.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Sejarah Yayasan" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Vision Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Visi & Misi</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="glass-effect rounded-xl p-8 hover-card-animation">
                <h3 className="text-2xl font-bold mb-4">Visi</h3>
                <p className="text-gray-700">
                  Menjadi lembaga pendidikan terkemuka yang menghasilkan lulusan berkarakter, 
                  berprestasi, dan mampu berkontribusi positif bagi masyarakat, bangsa, dan dunia.
                </p>
              </div>
              
              <div className="glass-effect rounded-xl p-8 hover-card-animation">
                <h3 className="text-2xl font-bold mb-4">Misi</h3>
                <ul className="space-y-3 text-gray-700 list-disc pl-5">
                  <li>Menyelenggarakan pendidikan berkualitas dengan kurikulum terpadu yang mengembangkan potensi siswa secara utuh.</li>
                  <li>Membentuk karakter dan kepribadian siswa berdasarkan nilai-nilai luhur budaya bangsa.</li>
                  <li>Menciptakan lingkungan belajar yang kondusif, inovatif, dan inspiratif.</li>
                  <li>Mengembangkan kompetensi tenaga pendidik dan kependidikan yang profesional.</li>
                  <li>Menjalin kerjasama dengan berbagai pihak untuk meningkatkan kualitas pendidikan.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Nilai-Nilai Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nilai-nilai berikut menjadi landasan bagi setiap kegiatan dan program kami
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm hover-card-animation text-center">
                <h3 className="text-xl font-bold mb-3">Integritas</h3>
                <p className="text-gray-600">
                  Menjunjung tinggi kejujuran, tanggung jawab, dan konsistensi dalam setiap tindakan.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm hover-card-animation text-center">
                <h3 className="text-xl font-bold mb-3">Inovasi</h3>
                <p className="text-gray-600">
                  Terus mengembangkan metode dan pendekatan baru dalam pendidikan.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm hover-card-animation text-center">
                <h3 className="text-xl font-bold mb-3">Inklusivitas</h3>
                <p className="text-gray-600">
                  Menghargai keberagaman dan memberikan kesempatan yang sama kepada semua.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm hover-card-animation text-center">
                <h3 className="text-xl font-bold mb-3">Inspirasi</h3>
                <p className="text-gray-600">
                  Menginspirasi setiap individu untuk mencapai potensi terbaiknya.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
