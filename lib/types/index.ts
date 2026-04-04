// Tipos para la configuración del DJ
export interface DJConfig {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  location: string;
  genres: string[];
  highlights: string;
  labels: string;
  email: string;
  social: SocialLinks;
}

export interface SocialLinks {
  instagram: string;
  soundcloud: string;
  spotify: string;
  youtube?: string;
  beatport?: string;
  apple?: string;
}

export interface HeroConfig {
  backgroundImage: string;
  backgroundType: "image" | "video";
  logo: string | null;
  showLogo: boolean;
  useTextInstead: boolean;
  artistName: string;
  tagline: string;
  position:
    | "center"
    | "top-center"
    | "bottom-center"
    | "left-center"
    | "right-center"
    | "bottom-left"
    | "bottom-right";
  logoSize: number;
  overlayOpacity: number;
  showButtons: boolean;
}

export interface AppearanceConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  font: "Inter" | "Poppins" | "Montserrat" | "Roboto" | "Space Grotesk";
  backgroundType: "solid" | "image" | "tile";
  backgroundImage: string | null;
  textureImage: string | null;
  textureOpacity: number;
  stylePreset: "dark" | "minimal" | "neon" | "clean";
}

export interface Event {
  id: string;
  date: string;
  city: string;
  venue: string;
  promoter: string;
}

export interface MusicLink {
  id: string;
  url: string;
  platform: "spotify" | "soundcloud" | "youtube" | "beatport" | "apple";
  isFeatured: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export interface RiderItem {
  id: string;
  item: string;
  requirement: string;
}

export interface ContactConfig {
  email: string;
  social: SocialLinks;
  showBookingButton: boolean;
}

export interface SectionToggle {
  about: boolean;
  events: boolean;
  music: boolean;
  gallery: boolean;
  rider: boolean;
  contact: boolean;
}

export interface DashboardData {
  dj: DJConfig;
  hero: HeroConfig;
  appearance: AppearanceConfig;
  events: Event[];
  music: MusicLink[];
  gallery: GalleryImage[];
  rider: RiderItem[];
  contact: ContactConfig;
  sections: SectionToggle;
}