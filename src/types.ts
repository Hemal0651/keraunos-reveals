export interface CollectionItem {
  id: string;
  index: string;
  name: string;
  description: string;
  category: string;
  price?: string;
  image?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface StatItem {
  id: string;
  target: number;
  label: string;
  suffix?: string;
}

export interface DetailStudy {
  id: string;
  index: string;
  title: string;
  label: string;
  imageUrl: string;
  objectPosition: string;
}
