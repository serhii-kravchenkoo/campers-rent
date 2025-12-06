"use client";

import { useEffect, useState } from "react";
import css from "./CamperDetails.module.css";
import { Camper } from "@/lib/types";

import Loader from "@/components/Loader/Loader";

import Image from "next/image";
import BookingForm from "../BookingForm/BookingForm";
import { fetchCamperByIdApi } from "@/lib/api";
import CamperTabs from "../CamperTabs/CamperTabs.";

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

  const {
    name,
    price,
    rating,
    location,
    gallery,
    description,
    reviews = [],
  } = camper;

  const mainImage =
    gallery?.[0]?.original || gallery?.[0]?.thumb || "/image/hero.webp";

  const reviewsCount = reviews.length;

  return (
    <main className={css.page}>
      <div className="container">
        {/* HEADER */}
        <div className={css.header}>
          <h1 className={css.title}>{name}</h1>

          <div className={css.metaRow}>
            <span className={css.rating}>
              <svg className={css.starIcon} aria-hidden="true">
                {/* змінюй шлях до sprite, якщо в тебе інший */}
                <use href="/sprite.svg#icon-rating" />
              </svg>

              <span className={css.ratingText}>
                {rating.toFixed(1)} ({reviewsCount} reviews)
              </span>
            </span>

            <span className={css.location}>
              <svg className={css.locationIcon} aria-hidden="true">
                <use href="/sprite.svg#icon-location" />
              </svg>
              {location}
            </span>
          </div>

          <p className={css.price}>€{price}.00</p>
        </div>

        <div className={css.gallery}>
          {gallery?.slice(0, 3).map((img, idx) => (
            <div key={idx} className={css.galleryItem}>
              <Image
                src={img.original || img.thumb || mainImage}
                alt={`${name} photo ${idx + 1}`}
                fill
                sizes="(min-width: 1024px) 292px, 33vw"
                className={css.galleryImg}
              />
            </div>
          ))}
        </div>


        <p className={css.description}>{description}</p>

        <div className={css.bottom}>
          <section className={css.tabsSection}>
            <CamperTabs camper={camper} />
          </section>

          <aside className={css.bookingSection}>
            <BookingForm />
          </aside>
        </div>
      </div>
    </main>
  );
}