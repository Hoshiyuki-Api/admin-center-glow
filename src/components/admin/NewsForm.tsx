
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { News, addNews, updateNews } from '@/services/dataService';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Save } from 'lucide-react';

interface NewsFormProps {
  news?: News;
  isEdit?: boolean;
}

const NewsForm = ({ news, isEdit = false }: NewsFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && news) {
      setTitle(news.title);
      setContent(news.content);
      setExcerpt(news.excerpt);
      setImageUrl(news.imageUrl);
      setAuthor(news.author);
    }
  }, [isEdit, news]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !excerpt || !imageUrl || !author) {
      toast({
        title: 'Formulir tidak lengkap',
        description: 'Harap isi semua field yang diperlukan',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isEdit && news) {
        updateNews(news.id, { title, content, excerpt, imageUrl, author });
        toast({
          title: 'Berita berhasil diperbarui',
          description: 'Perubahan telah disimpan',
        });
      } else {
        addNews({ title, content, excerpt, imageUrl, author });
        toast({
          title: 'Berita berhasil ditambahkan',
          description: 'Berita baru telah dipublikasikan',
        });
      }
      
      navigate('/admin/news');
    } catch (error) {
      console.error('Error submitting news:', error);
      toast({
        title: 'Terjadi kesalahan',
        description: 'Tidak dapat menyimpan berita. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Berita</Label>
        <Input
          id="title"
          placeholder="Masukkan judul berita"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Ringkasan</Label>
        <Textarea
          id="excerpt"
          placeholder="Masukkan ringkasan berita (akan ditampilkan di halaman daftar berita)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          disabled={isSubmitting}
          required
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Konten</Label>
        <Textarea
          id="content"
          placeholder="Masukkan konten berita lengkap (mendukung format HTML)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          required
          rows={10}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL Gambar</Label>
        <Input
          id="imageUrl"
          placeholder="Masukkan URL gambar berita"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author">Penulis</Label>
        <Input
          id="author"
          placeholder="Masukkan nama penulis"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/news')}
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
              {isEdit ? 'Perbarui Berita' : 'Simpan Berita'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;
