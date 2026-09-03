export interface Station {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  logo: string;
  category: string;
  city?: string;
  country?: string;
  website?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  isActive: boolean;
}

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
