"use client";

import Link from "next/link";
import css from "./CamperCard.module.css";
import { Camper } from "@/lib/types";
import { useCampersStore } from "@/lib/store/campersStore";
import Image from "next/image";

type Props = {
  camper: Camper;
};

const formatPrice = (price: number) => price.toFixed(2);

export default function CamperCard({ camper }: Props) {
  const { favorites, toggleFavorite } = useCampersStore();
  const isFav = favorites.includes(camper.id);

  const mainImage = camper.gallery[0]?.thumb ?? camper.gallery[0]?.original;

  return (
    <article className={css.card}>
      <div className={css.imgBox}>
        {mainImage && (
          <Image
            src={mainImage}
            alt={camper.name}
            fill
            className={css.img}
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        )}
      </div>

      <div className={css.content}>
        <div className={css.topRow}>
          <h2 className={css.title}>{camper.name}</h2>

          <div className={css.priceBlock}>
            <span className={css.price}>€{formatPrice(camper.price)}</span>

            <button
              type="button"
              className={isFav ? css.favActive : css.fav}
              onClick={() => toggleFavorite(camper.id)}
              aria-label="Add to favourites"
            >
              ♥
            </button>
          </div>
        </div>

        <div className={css.meta}>
          <span>⭐ {camper.rating.toFixed(1)} Reviews</span>
          <span>📍 {camper.location}</span>
        </div>

        <p className={css.description}>{camper.description}</p>

        <div className={css.tags}>
          <span>{camper.transmission}</span>
          <span>{camper.engine}</span>
          {camper.kitchen && <span>Kitchen</span>}
          {camper.AC && <span>AC</span>}
          {camper.bathroom && <span>Bathroom</span>}
        </div>

        <div className={css.footer}>
          <Link href={`/catalog/${camper.id}`} className={css.btn}>
            Show more
          </Link>
        </div>
      </div>
    </article>
  );
}