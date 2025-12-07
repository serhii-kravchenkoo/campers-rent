"use client";

import { useState } from "react";
import css from "./CamperTabs.module.css";

import Reviews from "../Reviews/Reviews";
import BookingForm from "../BookingForm/BookingForm";
import { Camper } from "@/lib/types";

type Props = {
  camper: Camper;
};

type Tab = "features" | "reviews";

export default function CamperTabs({ camper }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("features");

  const has = (val: boolean) => val === true;

  return (
    <div className={css.wrapper}>

      <div className={css.tabs}>
        <button
          type="button"
          className={`${css.tabBtn} ${
            activeTab === "features" ? css.tabBtnActive : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>

        <button
          type="button"
          className={`${css.tabBtn} ${
            activeTab === "reviews" ? css.tabBtnActive : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={css.contentRow}>
        <div className={css.leftCol}>
          {activeTab === "features" ? (
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
          ) : (
            <Reviews reviews={camper.reviews} />
          )}
        </div>

        <aside className={css.rightCol}>
          <BookingForm />
        </aside>
      </div>
    </div>
  );
}