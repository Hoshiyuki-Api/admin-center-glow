
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { admin } = useAuth();

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
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link, index) => 
                  link.dropdown ? (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-1 p-2">
                          {link.dropdown.map((dropdownItem, idx) => (
                            <li key={idx}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={dropdownItem.path}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium">{dropdownItem.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={index}>
                      <Link 
                        to={link.path} 
                        className={`${navigationMenuTriggerStyle()} ${
                          location.pathname === link.path ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
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
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            {admin && (
              <Link to="/admin/dashboard" className="mr-2">
                <Button size="sm">
                  Dashboard
                </Button>
              </Link>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[385px] pt-12">
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link, index) => 
                    link.dropdown ? (
                      <div key={index} className="space-y-3">
                        <div className="font-medium text-lg">{link.title}</div>
                        <div className="pl-4 space-y-3 border-l-2 border-primary/20">
                          {link.dropdown.map((item, idx) => (
                            <SheetClose asChild key={idx}>
                              <Link
                                to={item.path}
                                className="block text-base text-gray-600 hover:text-primary transition-colors"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SheetClose asChild key={index}>
                        <Link
                          to={link.path}
                          className={`text-lg font-medium transition-colors hover:text-primary ${
                            location.pathname === link.path ? 'text-primary' : 'text-gray-700'
                          }`}
                        >
                          {link.title}
                        </Link>
                      </SheetClose>
                    )
                  )}
                  {!admin && (
                    <SheetClose asChild>
                      <Link to="/login-admin" className="w-full">
                        <Button className="w-full mt-4">
                          Login Admin
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
