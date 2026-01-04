export interface Bike {
  image: string;
  iteration: number;
  max_speed: number;
  development_start: number;
  development_end: number | "Current";
  competitions: string[];
  description: string;
  gallery: string[];
}

export type BikeData = Record<string, Bike>;

export interface BikeGalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface BikeContentProps {
  activeTab: string;
  children?: React.ReactNode;
  bikeData: BikeData;
  bike: string;
}

