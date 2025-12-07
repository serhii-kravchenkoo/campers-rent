// lib/api.ts
import axios from "axios";
import { Camper, Filters, CampersListResponse } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// формуємо query-параметри під бекенд
const buildCampersParams = ( filters: Filters, page: number = 1, limit: number = 4 ) => {
  const params: Record<string, string | number | boolean> = { page, limit };

  if (filters.location.trim()) {
    params.location = filters.location.trim();
  }

  if (filters.form) {
    params.form = filters.form;
  }

  if (filters.transmission) {
  params.transmission = filters.transmission;
  }
  
  filters.equipment.forEach((feature) => {
    params[feature] = true;
  });

  return params;
};

export const fetchCampersApi = async (filters: Filters, page: number, limit: number): Promise<Camper[]> => {
  const params = buildCampersParams(filters, page, limit);

  const { data } = await api.get<CampersListResponse>("/campers", { params });
  return data.items;
};

export const fetchCamperByIdApi = async (id: string): Promise<Camper> => {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
};