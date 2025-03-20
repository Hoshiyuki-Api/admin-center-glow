
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  LogOut, 
  User, 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    navigate('/login-admin');
  };
  
  const menuItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, title: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Newspaper className="h-5 w-5" />, title: 'Kelola Berita', path: '/admin/news' },
    { icon: <Users className="h-5 w-5" />, title: 'Kelola Admin', path: '/admin/manage-admins' },
    { icon: <User className="h-5 w-5" />, title: 'Profil Saya', path: '/admin/profile' },
  ];

  useEffect(() => {
    // Close sidebar on route change on mobile
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[300px] pt-12">
        <div className="flex flex-col h-full">
          <nav className="flex-1 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                    {location.pathname === item.path && (
                      <ChevronRight className="ml-auto h-5 w-5" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                {admin?.imageUrl ? (
                  <AvatarImage src={admin.imageUrl} alt={admin.username} />
                ) : (
                  <AvatarFallback>
                    {admin?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{admin?.username}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <aside className="hidden md:block md:h-screen md:w-64 md:flex-shrink-0 bg-white shadow-md">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <Link to="/admin/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-primary">Admin</span>
            <span className="text-xl font-bold ml-1">Dashboard</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                  {location.pathname === item.path && (
                    <ChevronRight className="ml-auto h-5 w-5" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              {admin?.imageUrl ? (
                <AvatarImage src={admin.imageUrl} alt={admin.username} />
              ) : (
                <AvatarFallback>
                  {admin?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{admin?.username}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-primary">Admin</span>
          <span className="text-xl font-bold ml-1">Dashboard</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {admin?.imageUrl ? (
                    <AvatarImage src={admin.imageUrl} alt={admin.username} />
                  ) : (
                    <AvatarFallback>
                      {admin?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/admin/profile">Profil Saya</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <MobileSidebar />
        </div>
      </header>
      
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
