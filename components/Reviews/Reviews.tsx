"use client";

import css from "./Reviews.module.css";
import { Review } from "@/lib/types";

type Props = {
  reviews: Review[];
};

const stars = (rating: number) =>
  "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

export default function ReviewsComponent({ reviews }: Props) {
  if (!reviews.length) {
    return <p>У цього кемпера ще немає відгуків.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map((r, index) => (
        <li key={index} className={css.item}>
          <div className={css.avatar}>{r.reviewer_name[0]}</div>
          <div className={css.content}>
            <p className={css.name}>{r.reviewer_name}</p>
            <p className={css.stars}>{stars(r.reviewer_rating)}</p>
            <p className={css.comment}>{r.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}