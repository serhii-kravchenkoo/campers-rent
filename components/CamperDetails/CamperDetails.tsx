"use client";

import { useEffect, useState } from "react";
import css from "./CamperDetails.module.css";
import { Camper } from "@/lib/types";

import Loader from "@/components/Loader/Loader";
import CamperTabs from "@/components/CamperTabs/CamperTabs";

import Image from "next/image";
import BookingForm from "../BookingForm/BookingForm";
import { fetchCamperByIdApi } from "@/lib/api";


type Props = {
  id: string;
};

export default function CamperDetails({ id }: Props) {
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCamperByIdApi(id);
        setCamper(data);
      } catch {
        setError("Не вдалося завантажити кемпер");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className={css.error}>{error}</p>;
  if (!camper) return <p className={css.error}>Camper not found</p>;

  return (
    <main className={css.page}>
      <div className="container">
        <div className={css.header}>
          <h1 className={css.title}>{camper.name}</h1>
          <div className={css.meta}>
            <span>⭐ {camper.rating.toFixed(1)} Reviews</span>
            <span>📍 {camper.location}</span>
          </div>
          <p className={css.price}>€{camper.price.toFixed(2)}</p>
        </div>

        <div className={css.top}>
          <div className={css.gallery}>
            {camper.gallery.map((item, index) => (
              <div key={index} className={css.imageBox}>
                <Image
                  src={item.thumb}
                  alt={`${camper.name} photo ${index + 1}`}
                  fill
                  className={css.image}
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                />
              </div>
            ))}
          </div>

          <p className={css.description}>{camper.description}</p>
        </div>

        <div className={css.bottom}>
          <section className={css.tabsSection}>
            <CamperTabs camper={camper} />
          </section>
          <aside className={css.bookingSection}>
            <BookingForm camperName={camper.name} />
          </aside>
        </div>
      </div>
    </main>
  );
}