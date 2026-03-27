export interface Episode {
  id: string;
  seriesId: string;
  number: number;
  title: string;
  uploadDate: string;
  thumbnailUrl: string;
  images: string[];
  likes: number;
  isRead?: boolean;
}

export interface Series {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: 'Ongoing' | 'Completed' | 'Hiatus';
  rating: number;
  rank?: number;
  thumbnailUrl: string;
  bannerUrl: string;
  synopsis: string;
  subscribers: number;
  totalLikes: number;
  episodes: Episode[];
  isSubscribed?: boolean;
}

export interface UserState {
  readHistory: string[];
  subscribedSeries: string[];
  coinsBalance: number;
  favorites: string[];
}

const createEpisodeImages = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => 
    `https://images.unsplash.com/photo-${1550000000000 + i * 1000}?w=800&h=1200&fit=crop`
  );
};

export const seriesData: Series[] = [
  {
    id: 's1',
    title: 'Honey Trap',
    author: 'Sarah Kim',
    genre: 'Drama',
    status: 'Ongoing',
    rating: 9.89,
    rank: 1,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&h=500&fit=crop',
    synopsis: 'Dans un monde où les apparences sont trompeuses, Mina découvre un secret qui va bouleverser sa vie. Entre amour et trahison, elle devra faire des choix impossibles.',
    subscribers: 2450000,
    totalLikes: 15800000,
    episodes: [
      { id: 's1_e1', seriesId: 's1', number: 1, title: 'Le Commencement', uploadDate: '2025-12-01', thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=150&fit=crop', images: createEpisodeImages(8), likes: 145000 },
      { id: 's1_e2', seriesId: 's1', number: 2, title: 'Rencontre Inattendue', uploadDate: '2025-12-08', thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=150&fit=crop', images: createEpisodeImages(10), likes: 138000 },
      { id: 's1_e3', seriesId: 's1', number: 3, title: 'Le Piège se Referme', uploadDate: '2025-12-15', thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=150&fit=crop', images: createEpisodeImages(9), likes: 152000 },
      { id: 's1_e4', seriesId: 's1', number: 4, title: 'Révélations', uploadDate: '2025-12-22', thumbnailUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=150&fit=crop', images: createEpisodeImages(11), likes: 167000 },
      { id: 's1_e5', seriesId: 's1', number: 5, title: 'La Vérité Éclate', uploadDate: '2026-01-05', thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=150&fit=crop', images: createEpisodeImages(10), likes: 189000 },
    ],
  },
  {
    id: 's2',
    title: 'Lore Olympus',
    author: 'Rachel Smythe',
    genre: 'Romance',
    status: 'Ongoing',
    rating: 9.76,
    rank: 2,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=500&fit=crop',
    synopsis: 'La mythologie grecque revisitée. Perséphone, déesse du printemps, découvre les intrigues de l\'Olympe moderne.',
    subscribers: 5200000,
    totalLikes: 45000000,
    episodes: [
      { id: 's2_e1', seriesId: 's2', number: 1, title: 'Bienvenue à l\'Olympe', uploadDate: '2025-11-15', thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop', images: createEpisodeImages(12), likes: 890000 },
      { id: 's2_e2', seriesId: 's2', number: 2, title: 'Le Bal des Dieux', uploadDate: '2025-11-22', thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=150&fit=crop', images: createEpisodeImages(11), likes: 756000 },
      { id: 's2_e3', seriesId: 's2', number: 3, title: 'Secrets Divins', uploadDate: '2025-11-29', thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=150&fit=crop', images: createEpisodeImages(10), likes: 823000 },
    ],
  },
  {
    id: 's3',
    title: 'Tower of God',
    author: 'SIU',
    genre: 'Action',
    status: 'Ongoing',
    rating: 9.65,
    rank: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=500&fit=crop',
    synopsis: 'Bam entre dans une tour mystérieuse pour retrouver son amie. Ce qui l\'attend dépasse l\'imagination.',
    subscribers: 4800000,
    totalLikes: 38000000,
    episodes: [
      { id: 's3_e1', seriesId: 's3', number: 1, title: 'La Porte', uploadDate: '2025-10-01', thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=150&fit=crop', images: createEpisodeImages(15), likes: 456000 },
      { id: 's3_e2', seriesId: 's3', number: 2, title: 'Premier Étage', uploadDate: '2025-10-08', thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop', images: createEpisodeImages(14), likes: 412000 },
    ],
  },
  {
    id: 's4',
    title: 'True Beauty',
    author: 'Yaongyi',
    genre: 'Romance',
    status: 'Completed',
    rating: 9.52,
    rank: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=500&fit=crop',
    synopsis: 'Jugyeong maîtrise l\'art du maquillage. Mais que se passe-t-il quand son secret est découvert?',
    subscribers: 6100000,
    totalLikes: 52000000,
    episodes: [
      { id: 's4_e1', seriesId: 's4', number: 1, title: 'Le Secret', uploadDate: '2025-09-01', thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=150&fit=crop', images: createEpisodeImages(10), likes: 678000 },
    ],
  },
  {
    id: 's5',
    title: 'Omniscient Reader',
    author: 'Sing Shong',
    genre: 'Fantasy',
    status: 'Ongoing',
    rating: 9.81,
    rank: 5,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
    synopsis: 'Kim Dokja est le seul à avoir lu le roman jusqu\'à la fin. Maintenant, il vit cette histoire.',
    subscribers: 3900000,
    totalLikes: 29000000,
    episodes: [
      { id: 's5_e1', seriesId: 's5', number: 1, title: 'La Fin du Monde', uploadDate: '2025-08-15', thumbnailUrl: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=200&h=150&fit=crop', images: createEpisodeImages(13), likes: 534000 },
    ],
  },
  {
    id: 's6',
    title: 'The Remarried Empress',
    author: 'Alpha Tart',
    genre: 'Drama',
    status: 'Ongoing',
    rating: 9.45,
    rank: 6,
    thumbnailUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=500&fit=crop',
    synopsis: 'L\'impératrice parfaite est trahie. Elle décide de se remarier avec l\'empereur du royaume voisin.',
    subscribers: 3200000,
    totalLikes: 24000000,
    episodes: [
      { id: 's6_e1', seriesId: 's6', number: 1, title: 'La Trahison', uploadDate: '2025-07-01', thumbnailUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=150&fit=crop', images: createEpisodeImages(11), likes: 423000 },
    ],
  },
  {
    id: 's7',
    title: 'Unordinary',
    author: 'uru-chan',
    genre: 'Action',
    status: 'Ongoing',
    rating: 9.38,
    rank: 7,
    thumbnailUrl: 'https://images.unsplash.com/photo-1492446845049-9c50cc313f00?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1492446845049-9c50cc313f00?w=800&h=500&fit=crop',
    synopsis: 'Dans un monde où les pouvoirs définissent la hiérarchie, John cache un secret dangereux.',
    subscribers: 2800000,
    totalLikes: 21000000,
    episodes: [
      { id: 's7_e1', seriesId: 's7', number: 1, title: 'Sans Pouvoir', uploadDate: '2025-06-15', thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=150&fit=crop', images: createEpisodeImages(9), likes: 312000 },
    ],
  },
  {
    id: 's8',
    title: 'Let\'s Play',
    author: 'Mongie',
    genre: 'Comedy',
    status: 'Completed',
    rating: 9.21,
    rank: 8,
    thumbnailUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=500&fit=crop',
    synopsis: 'Sam, développeuse de jeux, voit sa vie chamboulée par son nouveau voisin influenceur.',
    subscribers: 2100000,
    totalLikes: 18000000,
    episodes: [
      { id: 's8_e1', seriesId: 's8', number: 1, title: 'Nouveau Voisin', uploadDate: '2025-05-01', thumbnailUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=150&fit=crop', images: createEpisodeImages(10), likes: 267000 },
    ],
  },
  {
    id: 's9',
    title: 'I Love Yoo',
    author: 'Quimchee',
    genre: 'Drama',
    status: 'Ongoing',
    rating: 9.15,
    rank: 9,
    thumbnailUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=600&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=500&fit=crop',
    synopsis: 'Shin-Ae évite les relations. Mais deux frères vont changer sa perspective sur la vie.',
    subscribers: 1900000,
    totalLikes: 15000000,
    episodes: [
      { id: 's9_e1', seriesId: 's9', number: 1, title: 'Rencontre Forcée', uploadDate: '2025-04-15', thumbnailUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=150&fit=crop', images: createEpisodeImages(8), likes: 198000 },
    ],
  },
];

export const genres = [
  { id: 'romance', name: 'Romance', icon: '💕', count: 1250 },
  { id: 'action', name: 'Action', icon: '⚔️', count: 890 },
  { id: 'drama', name: 'Drama', icon: '🎭', count: 1100 },
  { id: 'fantasy', name: 'Fantasy', icon: '🔮', count: 760 },
  { id: 'comedy', name: 'Comédie', icon: '😂', count: 650 },
  { id: 'thriller', name: 'Thriller', icon: '🔪', count: 420 },
  { id: 'horror', name: 'Horreur', icon: '👻', count: 380 },
  { id: 'slice_of_life', name: 'Tranche de vie', icon: '☕', count: 540 },
  { id: 'sci_fi', name: 'Sci-Fi', icon: '🚀', count: 310 },
  { id: 'sports', name: 'Sports', icon: '⚽', count: 180 },
  { id: 'historical', name: 'Historique', icon: '🏰', count: 290 },
  { id: 'superhero', name: 'Super-héros', icon: '🦸', count: 220 },
];

export const initialUserState: UserState = {
  readHistory: ['s1_e1', 's1_e2', 's2_e1'],
  subscribedSeries: ['s1', 's2'],
  coinsBalance: 50,
  favorites: ['s1', 's3'],
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`;
  
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};
