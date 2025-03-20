
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Admin {
  id: string;
  username: string;
  password: string; // In real app, passwords should be hashed and never stored in frontend
  createdAt: Date;
  updatedAt: Date;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

export interface Teacher {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  education: string;
  bio: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
  category: 'academic' | 'non-academic';
}

// Initial Data
export const admins: Admin[] = [
  {
    id: '1',
    username: 'administrator',
    password: 'admin123', // In real implementation, this would be a hashed password
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  }
];

export const news: News[] = [
  {
    id: '1',
    title: 'Yayasan Kami Meresmikan Gedung Baru',
    slug: 'yayasan-kami-meresmikan-gedung-baru',
    content: `<p>Dengan bangga kami umumkan bahwa Yayasan kami telah meresmikan gedung baru yang akan menjadi pusat kegiatan pendidikan dan sosial. Gedung ini dilengkapi dengan fasilitas modern untuk mendukung berbagai kegiatan.</p>
    <p>Peresmian dilakukan langsung oleh Bapak Walikota disaksikan oleh berbagai tokoh masyarakat dan pendidikan. Dalam sambutannya, beliau menekankan pentingnya pendidikan berkualitas untuk generasi masa depan.</p>
    <p>Gedung baru ini memiliki 15 ruang kelas, laboratorium komputer, perpustakaan, dan aula yang dapat menampung hingga 500 orang. Seluruh ruangan dilengkapi dengan teknologi terkini untuk mendukung proses pembelajaran yang optimal.</p>
    <p>Kami mengucapkan terima kasih kepada semua pihak yang telah mendukung pembangunan gedung ini. Semoga fasilitas ini dapat bermanfaat bagi masyarakat luas dan membantu mencapai visi misi yayasan kami.</p>`,
    excerpt: 'Yayasan kami baru saja meresmikan gedung baru yang dilengkapi dengan fasilitas modern untuk kegiatan pendidikan dan sosial.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15'),
    author: 'Ketua Yayasan'
  },
  {
    id: '2',
    title: 'Program Beasiswa untuk Siswa Berprestasi',
    slug: 'program-beasiswa-untuk-siswa-berprestasi',
    content: `<p>Yayasan kami dengan bangga mengumumkan program beasiswa baru untuk siswa-siswa berprestasi. Program ini dirancang untuk memberikan kesempatan kepada siswa berbakat dari keluarga kurang mampu untuk melanjutkan pendidikan.</p>
    <p>Beasiswa ini akan mencakup biaya pendidikan penuh, uang saku bulanan, dan mentoring dari profesional di bidangnya. Kami berharap program ini dapat membantu mengembangkan potensi siswa dan memberikan kesempatan yang sama dalam pendidikan.</p>
    <p>Persyaratan untuk mendapatkan beasiswa ini meliputi prestasi akademik yang baik, aktif dalam kegiatan ekstrakurikuler, dan berasal dari keluarga dengan penghasilan terbatas. Proses seleksi akan dilakukan secara transparan dan adil.</p>
    <p>Pendaftaran akan dibuka mulai tanggal 1 Agustus 2023. Untuk informasi lebih lanjut, silakan hubungi kantor yayasan kami atau kunjungi website resmi kami.</p>`,
    excerpt: 'Yayasan kami meluncurkan program beasiswa untuk siswa berprestasi dari keluarga kurang mampu, mencakup biaya pendidikan penuh dan mentoring.',
    imageUrl: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-07-20'),
    author: 'Kepala Bidang Pendidikan'
  },
  {
    id: '3',
    title: 'Kerjasama dengan Universitas Terkemuka',
    slug: 'kerjasama-dengan-universitas-terkemuka',
    content: `<p>Kami dengan senang hati mengumumkan kerjasama strategis antara Yayasan kami dengan salah satu universitas terkemuka di Indonesia. Kerjasama ini akan fokus pada pengembangan kurikulum, pelatihan guru, dan program magang untuk siswa.</p>
    <p>Melalui kerjasama ini, guru-guru di yayasan kami akan mendapatkan pelatihan berkala dari dosen-dosen universitas, sementara siswa akan memiliki kesempatan untuk mengikuti program magang dan kunjungan ke kampus. Universitas juga akan memberikan jalur khusus bagi lulusan terbaik dari sekolah kami.</p>
    <p>Penandatanganan MoU telah dilakukan pada tanggal 10 Juli 2023 oleh Ketua Yayasan dan Rektor Universitas. Kedua belah pihak berkomitmen untuk terus meningkatkan kualitas pendidikan dan menghasilkan lulusan yang berdaya saing tinggi.</p>
    <p>Kami berharap kerjasama ini dapat memberikan manfaat jangka panjang dan membuka lebih banyak peluang bagi siswa dan guru di yayasan kami.</p>`,
    excerpt: 'Yayasan kami menjalin kerjasama strategis dengan universitas terkemuka untuk pengembangan kurikulum, pelatihan guru, dan program magang.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    createdAt: new Date('2023-07-12'),
    updatedAt: new Date('2023-07-12'),
    author: 'Humas Yayasan'
  }
];

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Hadi Santoso',
    position: 'Kepala Sekolah',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
    education: 'S3 Manajemen Pendidikan, Universitas Indonesia',
    bio: 'Dr. Hadi Santoso memiliki pengalaman lebih dari 20 tahun dalam dunia pendidikan. Beliau fokus pada pengembangan metode pembelajaran inovatif dan telah menerbitkan beberapa buku tentang manajemen pendidikan.'
  },
  {
    id: '2',
    name: 'Siti Rahayu, M.Pd',
    position: 'Wakil Kepala Bidang Kurikulum',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
    education: 'S2 Pendidikan Matematika, Universitas Gadjah Mada',
    bio: 'Siti Rahayu adalah pengajar matematika berpengalaman dengan metode pembelajaran yang interaktif. Beliau juga aktif dalam pengembangan kurikulum nasional dan sering menjadi pembicara di berbagai seminar pendidikan.'
  },
  {
    id: '3',
    name: 'Budi Santoso, S.Pd',
    position: 'Guru Fisika',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    education: 'S1 Pendidikan Fisika, Universitas Pendidikan Indonesia',
    bio: 'Budi Santoso dikenal dengan pendekatan praktisnya dalam mengajarkan fisika. Beliau sering mengembangkan eksperimen sederhana untuk membantu siswa memahami konsep-konsep fisika yang kompleks.'
  },
  {
    id: '4',
    name: 'Dr. Ratna Dewi',
    position: 'Guru Bahasa Indonesia',
    imageUrl: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    education: 'S3 Linguistik, Universitas Indonesia',
    bio: 'Dr. Ratna Dewi adalah pakar bahasa Indonesia dengan spesialisasi sastra kontemporer. Beliau telah menulis beberapa buku dan artikel tentang perkembangan bahasa Indonesia modern.'
  }
];

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Juara Olimpiade Matematika Nasional',
    description: 'Tim kami berhasil meraih juara pertama dalam Olimpiade Matematika Nasional 2023. Prestasi ini merupakan hasil dari kerja keras siswa dan bimbingan intensif dari para guru.',
    date: new Date('2023-05-15'),
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'academic'
  },
  {
    id: '2',
    title: 'Juara Lomba Debat Bahasa Inggris',
    description: 'Tim debat kami memenangkan kompetisi debat bahasa Inggris tingkat provinsi yang diselenggarakan oleh Dinas Pendidikan. Prestasi ini menunjukkan kemampuan berbahasa Inggris yang sangat baik dari siswa-siswa kami.',
    date: new Date('2023-04-20'),
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74ec9c9d40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'academic'
  },
  {
    id: '3',
    title: 'Juara Kompetisi Futsal Antar Sekolah',
    description: 'Tim futsal kami berhasil menjadi juara dalam kompetisi antar sekolah se-kota. Kemenangan ini diraih berkat kerjasama tim yang solid dan latihan rutin yang dilakukan selama beberapa bulan.',
    date: new Date('2023-03-10'),
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'non-academic'
  },
  {
    id: '4',
    title: 'Penghargaan Sekolah Berwawasan Lingkungan',
    description: 'Sekolah kami menerima penghargaan sebagai Sekolah Berwawasan Lingkungan dari Kementerian Lingkungan Hidup. Penghargaan ini diberikan atas upaya konsisten dalam menerapkan prinsip-prinsip ramah lingkungan di lingkungan sekolah.',
    date: new Date('2023-06-05'),
    imageUrl: 'https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
    category: 'non-academic'
  }
];

// Helper Functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Simulated Database Functions
export const getNewsBySlug = (slug: string): News | undefined => {
  return news.find(item => item.slug === slug);
};

export const getLatestNews = (limit: number = 3): News[] => {
  return [...news]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

export const addNews = (newsData: Omit<News, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): News => {
  const newNews: News = {
    id: uuidv4(),
    slug: generateSlug(newsData.title),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...newsData
  };
  
  news.push(newNews);
  return newNews;
};

export const updateNews = (id: string, newsData: Partial<Omit<News, 'id' | 'createdAt' | 'updatedAt'>>): News | null => {
  const index = news.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  const updatedNews = {
    ...news[index],
    ...newsData,
    updatedAt: new Date(),
    slug: newsData.title ? generateSlug(newsData.title) : news[index].slug
  };
  
  news[index] = updatedNews;
  return updatedNews;
};

export const deleteNews = (id: string): boolean => {
  const index = news.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  news.splice(index, 1);
  return true;
};

export const authenticateAdmin = (username: string, password: string): Admin | null => {
  const admin = admins.find(
    admin => admin.username === username && admin.password === password
  );
  return admin || null;
};

export const addAdmin = (adminData: { username: string; password: string }): Admin => {
  const newAdmin: Admin = {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...adminData
  };
  
  admins.push(newAdmin);
  return newAdmin;
};

export const updateAdmin = (id: string, adminData: Partial<Omit<Admin, 'id' | 'createdAt' | 'updatedAt'>>): Admin | null => {
  const index = admins.findIndex(admin => admin.id === id);
  if (index === -1) return null;
  
  const updatedAdmin = {
    ...admins[index],
    ...adminData,
    updatedAt: new Date()
  };
  
  admins[index] = updatedAdmin;
  return updatedAdmin;
};

export const deleteAdmin = (id: string): boolean => {
  const index = admins.findIndex(admin => admin.id === id);
  if (index === -1) return false;
  
  admins.splice(index, 1);
  return true;
};

export const filterAchievements = (category: 'academic' | 'non-academic' | 'all'): Achievement[] => {
  if (category === 'all') return achievements;
  return achievements.filter(achievement => achievement.category === category);
};
