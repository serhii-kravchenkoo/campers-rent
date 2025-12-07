
export type GalleryItem = {
  thumb: string;
  original: string;
};


export type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};


export type CamperForm = "alcove" | "fullyIntegrated" | "panelTruck";

export type TransmissionFilter = "automatic" | "manual" | null;

export type EquipmentFilter = | "AC" | "bathroom" | "kitchen" | "TV";


export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;

  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;

  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid";

  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;

  gallery: GalleryItem[];
  reviews: Review[];
};


export type CampersListResponse = {
  total: number;
  items: Camper[];
};


export type Filters = {
  location: string;
  form: CamperForm | null;
  equipment: EquipmentFilter[];
  transmission: TransmissionFilter;
};