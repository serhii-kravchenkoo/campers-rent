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



const FORM_ICON_MAP: Record<string, string> = {
  panelTruck: "/sprite.svg#icon-bi_grid-1x2",
  fullyIntegrated: "/sprite.svg#icon-bi_grid",
  alcove: "/sprite.svg#icon-bi_grid-3x3-gap",
};



const getEquipmentIconId = (value: string): string | null => {
  switch (value) {
    case "AC":
      return "icon-wind";
    case "kitchen":
      return "icon-kitchen";
    case "bathroom":
      return "icon-shower";
    case "TV":
      return "icon-tv";
    case "radio":
      return "icon-radio";
    case "refrigerator":
      return "icon-fridge";
    case "microwave":
      return "icon-microwave";
    case "gas":
      return "icon-gas";
    case "water":
      return "icon-wind"; // або іншу, якщо захочеш
    default:
      return null;
  }
};

















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

  <div className={css.inputWrapper}>
    <svg className={css.inputIcon} aria-hidden="true">
      <use href="/sprite.svg#icon-location" />
      {/* або xlinkHref="#icon-location" якщо у тебе ще старий синтаксис */}
    </svg>

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
</div>

      


      {/* Filters */}
      <div className={css.block}>
        <p className={css.sectionTitle}>Filters</p>

        {/* Vehicle equipment */}
        <p className={css.subTitle}>Vehicle equipment</p>

        



        
<div className={css.grid}>
  {EQUIPMENT_OPTIONS.map((opt) => {
    const iconId = getEquipmentIconId(opt.value);

    return (
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
        {iconId && (
          <svg className={css.icon32} aria-hidden="true">
            <use href={`/sprite.svg#${iconId}`} />
          </svg>
        )}
        {opt.label}
      </button>
    );
  })}

  {/* Automatic з іконкою */}
  <button
    type="button"
    className={
      localFilters.transmission === "automatic"
        ? `${css.chip} ${css.chipActive}`
        : css.chip
    }
    onClick={toggleAutomatic}
  >
    <svg className={css.icon32} aria-hidden="true">
      <use href="/sprite.svg#icon-diagram" />
    </svg>
    Automatic
  </button>
</div>

        






        

        <p className={css.subTitle}>Vehicle type</p>



<div className={css.grid}>
  {FORM_OPTIONS.map((opt) => {
    const icon = FORM_ICON_MAP[opt.value];

    return (
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
        <svg className={css.icon32}>
          <use href={icon} />
        </svg>

        <span>{opt.label}</span>
      </button>
    );
  })}
</div>





        
      </div>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}