
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Yayasan Pendidikan</h3>
            <p className="text-gray-300">
              Memberikan pendidikan berkualitas dan membangun karakter generasi masa depan Indonesia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang-kami" className="text-gray-300 hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/prestasi" className="text-gray-300 hover:text-primary transition-colors">
                  Prestasi
                </Link>
              </li>
              <li>
                <Link to="/profil-guru" className="text-gray-300 hover:text-primary transition-colors">
                  Profil Guru
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-gray-300 hover:text-primary transition-colors">
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-300">
                  Jl. Pendidikan No. 123, Kota Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-300">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-300">info@yayasanpendidikan.ac.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Senin - Jumat: 07:00 - 16:00</li>
              <li className="text-gray-300">Sabtu: 07:00 - 12:00</li>
              <li className="text-gray-300">Minggu & Hari Libur: Tutup</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Yayasan Pendidikan. Hak Cipta Dilindungi.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/kebijakan-privasi" className="text-gray-400 text-sm hover:text-primary transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link to="/syarat-ketentuan" className="text-gray-400 text-sm hover:text-primary transition-colors">
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
