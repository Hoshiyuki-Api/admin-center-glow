
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/admin/LoginForm';

const Login = () => {
  const { admin } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // If already logged in, redirect to dashboard
  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="mt-2 text-gray-600">
            Masuk ke dashboard admin untuk mengelola konten website
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-8">
          <LoginForm />
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Jika Anda lupa kredensial login, silakan hubungi administrator sistem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
