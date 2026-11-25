export type Language = 'ES' | 'EN' | 'FR' | 'PT';

export type PageId =
  | 'inicio'
  | 'asistente'
  | 'sugerencias'
  | 'tendencias'
  | 'medidas'
  | 'lista';

export type GestureState =
  | 'Saludando'
  | 'Saludando con la mano'
  | 'Interactuando feliz'
  | 'Escuchando tu voz';

export interface UserMeasurements {
  chestCm: number;
  waistCm: number;
  hipCm: number;
  legLengthCm: number;
  armLengthCm: number;
  clothingSize: 'XS' | 'S' | 'M' | 'L' | 'XL';
  footLengthCm: number;
  footWidth: 'Estrecho' | 'Estándar' | 'Ancho';
  shoeSizeEU: number;
  preferredSystem: 'EU' | 'US' | 'UK';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Calzado' | 'Tecnología' | 'Ropa' | 'Hogar';
  badgeType: 'size_shoe' | 'size_cloth' | 'discount' | 'trend' | 'comfort';
  badgeText?: string;
  highlightText: string;
  description: string;
  image?: string;
  imageAlt: string;
  fallbackIcon: string;
  rating: number;
  pros: string[];
  priceNote?: string;
  featuredOnHome?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'lumi';
  text: string;
  translatedText?: string;
  recommendedProductIds?: string[];
  comparisonTip?: string;
  isError?: boolean;
}

export interface NotificationItem {
  id: string;
  category: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
  targetPage: PageId;
}

export interface TrendItem {
  id: string;
  categoryLabel: string;
  icon: string;
  accentColor: 'primary' | 'secondary' | 'tertiary';
  title: string;
  description: string;
  savingsBadge: string;
  relatedProductId: string;
}
