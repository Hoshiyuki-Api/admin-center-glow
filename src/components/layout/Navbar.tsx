
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { admin } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: 'Beranda', path: '/' },
    { title: 'Tentang Kami', path: '/tentang-kami' },
    { 
      title: 'Prestasi', 
      path: '/prestasi',
      dropdown: [
        { title: 'Akademik', path: '/prestasi?kategori=academic' },
        { title: 'Non-Akademik', path: '/prestasi?kategori=non-academic' }
      ] 
    },
    { title: 'Profil Guru', path: '/profil-guru' },
    { title: 'Berita', path: '/berita' },
    { title: 'Hubungi Kami', path: '/hubungi-kami' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Yayasan</span>
            <span className="text-2xl font-bold ml-1">Pendidikan</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => 
              link.dropdown ? (
                <div key={index} className="relative group">
                  <button className="flex items-center text-base font-medium text-gray-700 hover:text-primary transition-colors">
                    {link.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                    {link.dropdown.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className={`text-base font-medium hover:text-primary transition-colors ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-700'
                  }`}
                >
                  {link.title}
                </Link>
              )
            )}
            {admin ? (
              <Link to="/admin/dashboard">
                <Button>
                  Dashboard Admin
                </Button>
              </Link>
            ) : (
              <Link to="/login-admin">
                <Button variant="outline">
                  Login Admin
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, index) => 
                link.dropdown ? (
                  <div key={index} className="space-y-2">
                    <div className="font-medium text-gray-700">{link.title}</div>
                    <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="block text-sm text-gray-600 hover:text-primary"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={link.path}
                    className={`font-medium ${
                      location.pathname === link.path ? 'text-primary' : 'text-gray-700'
                    }`}
                  >
                    {link.title}
                  </Link>
                )
              )}
              {admin ? (
                <Link to="/admin/dashboard">
                  <Button className="w-full">
                    Dashboard Admin
                  </Button>
                </Link>
              ) : (
                <Link to="/login-admin">
                  <Button variant="outline" className="w-full">
                    Login Admin
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
