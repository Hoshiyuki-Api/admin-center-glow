
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Pesan Terkirim',
        description: 'Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Pengiriman gagal',
        description: 'Maaf, pesan Anda tidak dapat dikirim. Silakan coba lagi nanti.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-3xl animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
              <p className="text-xl text-white/90">
                Kami siap menjawab pertanyaan dan memberikan informasi yang Anda butuhkan.
                Jangan ragu untuk menghubungi kami.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Masukkan alamat email Anda"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Masukkan subjek pesan"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Masukkan pesan Anda"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      rows={6}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <MapPin className="mt-1 mr-4 h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Alamat</h3>
                      <p className="text-gray-600">
                        Jl. Pendidikan No. 123,<br />
                        Kecamatan Pendidikan, Kota Jakarta,<br />
                        Indonesia, 12345
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mt-1 mr-4 h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Telepon</h3>
                      <p className="text-gray-600">+62 21 1234 5678</p>
                      <p className="text-gray-600">+62 812 3456 7890 (WhatsApp)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="mt-1 mr-4 h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-gray-600">info@yayasanpendidikan.ac.id</p>
                      <p className="text-gray-600">admin@yayasanpendidikan.ac.id</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mt-1 mr-4 h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Jam Operasional</h3>
                      <p className="text-gray-600">Senin - Jumat: 07:00 - 16:00</p>
                      <p className="text-gray-600">Sabtu: 07:00 - 12:00</p>
                      <p className="text-gray-600">Minggu & Hari Libur: Tutup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-8">
          <div className="container-custom">
            <div className="bg-gray-200 rounded-xl overflow-hidden h-96">
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-600">Google Maps akan dimuat di sini</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
