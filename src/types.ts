export type CuisineType =
  | 'All'
  | 'Italian'
  | 'Asian'
  | 'Indian'
  | 'Mexican'
  | 'Pakistani'
  | 'Mediterranean'
  | 'Japanese'
  | 'Desserts'
  | 'French'
  | 'Seafood';

export type PriceLevel = '$' | '$$' | '$$$' | '$$$$';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Starters' | 'Main Courses' | 'Grills' | 'Vegetarian' | 'Desserts' | 'Drinks';
  dietary?: ('Gluten-Free' | 'Vegan' | 'Vegetarian' | 'Halal' | 'Chef Special')[];
  chefName?: string;
  rating?: number;
  popular?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  restaurantName?: string;
  verifiedDiner?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  cuisine: CuisineType;
  secondaryCuisines?: string[];
  rating: number;
  reviewCount: number;
  priceLevel: PriceLevel;
  priceRangeStr: string; // e.g., "$35 - $65"
  location: string;
  address: string;
  city: string;
  distance: string; // e.g. "1.2 km"
  isOpen: boolean;
  openingHours: string;
  image: string;
  gallery: string[];
  features: string[]; // e.g. "Rooftop", "Outdoor Garden", "Valet Parking", "Sommelier"
  featuredDishName: string;
  featuredDishPrice: number;
  featuredDishImage: string;
  chefName: string;
  chefTitle: string;
  chefBio: string;
  collections: string[]; // IDs of collections it belongs to
  menu: MenuItem[];
  reviews: Review[];
  hasDelivery: boolean;
  hasReservation: boolean;
  deliveryTime: string; // e.g. "25-35 min"
}

export interface RestaurantCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  restaurantCount: number;
  image: string;
  tag: string;
}

export interface FoodArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string[];
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  image: string;
  featured?: boolean;
}

export interface DiningOffer {
  id: string;
  title: string;
  discount: string;
  restaurantName: string;
  restaurantId: string;
  description: string;
  expires: string;
  terms: string;
  promoCode: string;
  image: string;
  badge: string;
}

export interface OrderItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
}

export type OrderStatus = 'Confirmed' | 'Preparing' | 'On the Way' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress: string;
  createdAt: string;
  estimatedArrival: string;
  status: OrderStatus;
  driverName?: string;
  driverPhone?: string;
  currentLocation?: { lat: number; lng: number };
  stepIndex: number; // 0 to 3
}

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  restaurantAddress: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Standard' | 'Outdoor Terrace' | 'Rooftop' | 'Chef Counter' | 'Quiet Booth';
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  bookingCode: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberTier: 'Epicurean Gold' | 'Gourmet Silver' | 'Foodie Member';
  savedRestaurants: string[];
  savedDishes: string[];
  dietaryPreferences: string[];
  favoriteCuisines: string[];
  seatingPreference: string;
  deliveryAddresses: { id: string; label: string; address: string; isDefault: boolean }[];
  paymentMethods: { id: string; brand: string; last4: string; expiry: string; isDefault: boolean }[];
}

export type ActiveTab =
  | 'home'
  | 'explore'
  | 'restaurants'
  | 'experiences'
  | 'offers'
  | 'articles'
  | 'orders'
  | 'saved'
  | 'account'
  | 'contact';
