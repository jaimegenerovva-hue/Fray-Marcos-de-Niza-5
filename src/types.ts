export interface HighlightItem {
  icon: string; // Will map to a Lucide icon
  title: string;
  description: string;
}

export interface NearbyItem {
  category: 'Education' | 'Health' | 'Shopping' | 'Gastronomy' | 'Parks';
  name: string;
  distance: string;
  timeFoot?: string;
  timeCar?: string;
  coordinates: [number, number]; // [lat, lng] for the map
}

export interface PropertyDetails {
  id: string;
  title: string;
  subtitle: string;
  locationName: string; // e.g. "Simón Verde, Mairena del Aljarafe, Sevilla"
  coordinates: [number, number]; // [lat, lng] of the main villa
  buildArea: number; // m2
  bedrooms: number;
  bathrooms: number;
  plotArea: number; // m2
  description: string[]; // 2-3 paragraphs of story
  highlights: HighlightItem[];
  nearbyPoints: NearbyItem[];
  photos: {
    url: string;
    caption: string;
  }[];
}

export interface Lead {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: string;
  propertyId: string;
}
