"use client";

import { useState } from "react";
import css from "./CamperTabs.module.css";
import { Camper } from "@/lib/types";
import ReviewsComponent from "../Reviews/Reviews";


type Props = {
  camper: Camper;
};

export default function CamperTabs({ camper }: Props) {
  const [tab, setTab] = useState<"features" | "reviews">("features");

  const has = (val: boolean) => val === true;

  return (
    <div className={css.wrapper}>
      <div className={css.tabs}>
        <button
          type="button"
          className={tab === "features" ? css.active : css.tab}
          onClick={() => setTab("features")}
        >
          Features
        </button>
        <button
          type="button"
          className={tab === "reviews" ? css.active : css.tab}
          onClick={() => setTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {tab === "features" && (
        <div className={css.features}>
          <div className={css.chips}>
            <span>{camper.transmission}</span>
            <span>{camper.engine}</span>
            {has(camper.AC) && <span>AC</span>}
            {has(camper.kitchen) && <span>Kitchen</span>}
            {has(camper.bathroom) && <span>Bathroom</span>}
            {camper.TV && <span>TV</span>}
            {camper.radio && <span>Radio</span>}
            {camper.refrigerator && <span>Refrigerator</span>}
            {camper.microwave && <span>Microwave</span>}
            {camper.gas && <span>Gas</span>}
            {camper.water && <span>Water</span>}
          </div>

          <div className={css.detailsCard}>
            <h3>Vehicle details</h3>
            <ul>
              <li>
                <span>Form</span>
                <span>{camper.form}</span>
              </li>
              <li>
                <span>Length</span>
                <span>{camper.length}</span>
              </li>
              <li>
                <span>Width</span>
                <span>{camper.width}</span>
              </li>
              <li>
                <span>Height</span>
                <span>{camper.height}</span>
              </li>
              <li>
                <span>Tank</span>
                <span>{camper.tank}</span>
              </li>
              <li>
                <span>Consumption</span>
                <span>{camper.consumption}</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {tab === "reviews" && <ReviewsComponent reviews={camper.reviews} />}
    </div>
  );
}