// components/Filters/Filters.tsx

"use client";

import { FormEvent, useState } from "react";
import css from "./Filters.module.css";
import { useCampersStore } from "@/lib/store/campersStore";
import {
  Filters,
  CamperForm,
  EquipmentFilter,
  TransmissionFilter,
} from "@/lib/types";

const FORM_OPTIONS: { value: CamperForm; label: string }[] = [
  { value: "panelTruck", label: "Van" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

const EQUIPMENT_OPTIONS: { value: EquipmentFilter; label: string }[] = [
  { value: "AC", label: "AC" },
  { value: "kitchen", label: "Kitchen" },
  { value: "TV", label: "TV" },
  { value: "bathroom", label: "Bathroom" },
];

export default function FiltersComponent() {
  const { filters, setFilters, fetchCampers } = useCampersStore();
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilters(localFilters);
    fetchCampers({ reset: true });
  };

  const toggleEquipment = (value: EquipmentFilter) => {
    setLocalFilters((prev) => {
      const exists = prev.equipment.includes(value);
      return {
        ...prev,
        equipment: exists
          ? prev.equipment.filter((item) => item !== value)
          : [...prev.equipment, value],
      };
    });
  };

  const toggleForm = (value: CamperForm) => {
    setLocalFilters((prev) => ({
      ...prev,
      form: prev.form === value ? null : value,
    }));
  };

  // 👇 "Automatic" живе в transmission, але показується в Vehicle equipment
  const toggleAutomatic = () => {
    setLocalFilters((prev) => ({
      ...prev,
      transmission:
        prev.transmission === "automatic" ? null : ("automatic" as TransmissionFilter),
    }));
  };

  return (
    <form className={css.filters} onSubmit={handleSubmit}>
      {/* Location */}
      <div className={css.block}>
        <label className={css.label}>Location</label>
        <input
          type="text"
          className={css.input}
          value={localFilters.location}
          onChange={(e) =>
            setLocalFilters((prev) => ({ ...prev, location: e.target.value }))
          }
          placeholder="Kyiv, Ukraine"
        />
      </div>

      {/* Filters */}
      <div className={css.block}>
        <p className={css.sectionTitle}>Filters</p>

        {/* Vehicle equipment */}
        <p className={css.subTitle}>Vehicle equipment</p>
        <div className={css.grid}>
          {EQUIPMENT_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              className={
                localFilters.equipment.includes(opt.value)
                  ? `${css.chip} ${css.chipActive}`
                  : css.chip
              }
              onClick={() => toggleEquipment(opt.value)}
            >
              {opt.label}
            </button>
          ))}

          {/* 👇 Ось тут Automatic, але він працює через transmission */}
          <button
            type="button"
            className={
              localFilters.transmission === "automatic"
                ? `${css.chip} ${css.chipActive}`
                : css.chip
            }
            onClick={toggleAutomatic}
          >
            Automatic
          </button>
        </div>

        {/* Vehicle type */}
        <p className={css.subTitle}>Vehicle type</p>
        <div className={css.grid}>
          {FORM_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              className={
                localFilters.form === opt.value
                  ? `${css.chip} ${css.chipActive}`
                  : css.chip
              }
              onClick={() => toggleForm(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}