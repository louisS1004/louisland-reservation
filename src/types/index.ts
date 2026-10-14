export interface Attraction {
  id: string;
  name: string;
  category: 'parkour' | 'thrill' | 'family' | 'food';
  categoryLabel: string;
  description: string;
  image: string;
  minHeight?: string;
  thrillLevel: 1 | 2 | 3 | 4 | 5;
  waitTime: string;
  zone: string;
  featured?: boolean;
}

export interface FoodDish {
  id: string;
  name: string;
  type: 'Burger' | 'Dessert' | 'Glace';
  description: string;
  price: string;
  badge?: string;
}

export interface TicketPackage {
  id: string;
  name: string;
  subtitle: string;
  priceAdult: number;
  priceChild: number;
  popular?: boolean;
  features: string[];
}

export interface BookingData {
  date: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  fastPass: boolean;
  parking: boolean;
  packageId: string;
  fullName: string;
  email: string;
  phone: string;
  bookingRef?: string;
  totalPrice: number;
}
