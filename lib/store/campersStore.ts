// lib/store/campersStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper, Filters } from "../types";
import { fetchCampersApi } from "../api";

const LIMIT = 4;

type CampersState = {
  campers: Camper[];
  page: number;
  isLoading: boolean;
  error: string | null;
  filters: Filters;
  favorites: string[];

  setFilters: (filters: Filters) => void;
  fetchCampers: (opts?: { reset?: boolean }) => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (id: string) => void;
};

const defaultFilters: Filters = {
  location: "",
  form: null,
  equipment: [],
  transmission: null,
  
};

export const useCampersStore = create<CampersState, [["zustand/persist", CampersState]]>(
  persist(
    (set, get) => ({
      campers: [],
      page: 1,
      isLoading: false,
      error: null,
      filters: defaultFilters,
      favorites: [],

      setFilters: (filters) => {
        set({ filters, page: 1, campers: [] });
      },

      fetchCampers: async (opts) => {
        const { filters, page, campers } = get();
        const needReset = opts?.reset ?? false;
        const currentPage = needReset ? 1 : page;

        try {
          set({ isLoading: true, error: null });

          const data = await fetchCampersApi(filters, currentPage, LIMIT);

          set({
            campers: needReset ? data : [...campers, ...data],
            page: currentPage,
          });
        } catch {
          set({ error: "Не вдалося завантажити кемпери" });
        } finally {
          set({ isLoading: false });
        }
      },

      loadMore: async () => {
        const { page } = get();
        set({ page: page + 1 });
        await get().fetchCampers();
      },

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((f) => f !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
    }),
    {
      name: "travel-trucks-store", 
    }
  )
);