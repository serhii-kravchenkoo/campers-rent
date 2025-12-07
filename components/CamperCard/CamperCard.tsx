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
  <svg className={css.favIcon} aria-hidden="true">
    <use href="/sprite.svg#icon-heart" />
  </svg>
</button>




          </div>
        </div>

<div className={css.meta}>
  <span className={css.rating}>
    <svg className={css.starIcon} aria-hidden="true">
      <use href="/sprite.svg#icon-rating" />
    </svg>

    <span className={css.ratingText}>
      {camper.rating.toFixed(1)} ({camper.reviews.length} Reviews)
    </span>
  </span>

  <span className={css.location}>
    <svg className={css.locationIcon} aria-hidden="true">
      <use href="/sprite.svg#icon-location" />
    </svg>
    {camper.location}
  </span>
</div>

        <p className={css.description}>{camper.description}</p>

        





<div className={css.tags}>

  <span className={css.tag}>
    <svg className={css.tagIcon}>
      <use href="/sprite.svg#icon-diagram" />
    </svg>
    {camper.transmission}
  </span>


<span className={css.tag}>
  <svg className={css.tagIcon}>
    <use href="/sprite.svg#icon-fuel-pump" />
  </svg>
  {camper.engine}
</span>

 
  {camper.kitchen && (
    <span className={css.tag}>
      <svg className={css.tagIcon}>
        <use href="/sprite.svg#icon-kitchen" />
      </svg>
      Kitchen
    </span>
  )}


  {camper.AC && (
    <span className={css.tag}>
      <svg className={css.tagIcon}>
        <use href="/sprite.svg#icon-wind" />
      </svg>
      AC
    </span>
  )}


  {camper.bathroom && (
    <span className={css.tag}>
      <svg className={css.tagIcon}>
        <use href="/sprite.svg#icon-shower" />
      </svg>
      Bathroom
    </span>
  )}
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