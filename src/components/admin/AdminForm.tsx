
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Admin, addAdmin, updateAdmin, admins } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Save, Image, Upload, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AdminFormProps {
  adminData?: Admin;
  isEdit?: boolean;
  isProfile?: boolean;
}

const AdminForm = ({ adminData, isEdit = false, isProfile = false }: AdminFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [existingUsername, setExistingUsername] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { admin: currentAdmin, updateProfile } = useAuth();

  useEffect(() => {
    if (isEdit && adminData) {
      setUsername(adminData.username);
      setExistingUsername(adminData.username);
      setImageUrl(adminData.imageUrl);
    } else if (isProfile && currentAdmin) {
      setUsername(currentAdmin.username);
      setExistingUsername(currentAdmin.username);
      setImageUrl(currentAdmin.imageUrl);
    }
  }, [isEdit, adminData, isProfile, currentAdmin]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server or cloud storage
      // For this demo, we'll use a FileReader to create a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Username validation
    if (!username.trim()) {
      toast({
        title: 'Username diperlukan',
        description: 'Harap masukkan username',
        variant: 'destructive',
      });
      return;
    }
    
    // Check for duplicate username
    if (username !== existingUsername) {
      const usernameExists = admins.some(admin => 
        admin.username === username && 
        (!adminData || admin.id !== adminData.id)
      );
      
      if (usernameExists) {
        toast({
          title: 'Username sudah ada',
          description: 'Silakan pilih username lain',
          variant: 'destructive',
        });
        return;
      }
    }
    
    // Password validation for new admin or when changing password
    if (!isEdit || password) {
      if (!password) {
        toast({
          title: 'Password diperlukan',
          description: 'Harap masukkan password',
          variant: 'destructive',
        });
        return;
      }
      
      if (password !== confirmPassword) {
        toast({
          title: 'Password tidak cocok',
          description: 'Password dan konfirmasi password harus sama',
          variant: 'destructive',
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isProfile) {
        // Update current user profile
        const data: { username?: string; password?: string; imageUrl?: string } = {};
        if (username !== currentAdmin?.username) data.username = username;
        if (password) data.password = password;
        if (imageUrl !== currentAdmin?.imageUrl) data.imageUrl = imageUrl;
        
        const success = await updateProfile(data);
        if (success) {
          toast({
            title: 'Profil diperbarui',
            description: 'Informasi profil Anda telah diperbarui',
          });
        }
      } else if (isEdit && adminData) {
        // Update existing admin
        const data: { username?: string; password?: string; imageUrl?: string } = {};
        if (username !== adminData.username) data.username = username;
        if (password) data.password = password;
        if (imageUrl !== adminData.imageUrl) data.imageUrl = imageUrl;
        
        const updated = updateAdmin(adminData.id, data);
        if (updated) {
          toast({
            title: 'Admin diperbarui',
            description: 'Informasi admin telah diperbarui',
          });
        }
      } else {
        // Add new admin
        addAdmin({ username, password, imageUrl });
        toast({
          title: 'Admin ditambahkan',
          description: 'Admin baru telah berhasil ditambahkan',
        });
      }
      
      navigate(isProfile ? '/admin/profile' : '/admin/manage-admins');
    } catch (error) {
      console.error('Error submitting admin form:', error);
      toast({
        title: 'Terjadi kesalahan',
        description: 'Tidak dapat menyimpan data. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Foto Profil</Label>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={username} />
              ) : (
                <AvatarFallback className="text-lg">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            {imageUrl && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <Input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Foto
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG atau GIF. Maksimal 1MB.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">
          {isEdit || isProfile ? 'Password Baru (kosongkan jika tidak ingin mengubah)' : 'Password'}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={isEdit || isProfile ? 'Kosongkan jika tidak ingin mengubah' : 'Masukkan password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          required={!isEdit && !isProfile}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          {isEdit || isProfile ? 'Konfirmasi Password Baru' : 'Konfirmasi Password'}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Konfirmasi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
          required={!isEdit && !isProfile || !!password}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(isProfile ? '/admin/profile' : '/admin/manage-admins')}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {isEdit || isProfile ? 'Perbarui' : 'Simpan'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AdminForm;
