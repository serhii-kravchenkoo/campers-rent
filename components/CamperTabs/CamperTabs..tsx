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
  {/* Transmission */}
  <span>
    <svg className={css.chipIcon} aria-hidden="true">
      <use href="/sprite.svg#icon-diagram" />
    </svg>
    {camper.transmission}
  </span>

  {/* Engine */}
  <span>
    <svg className={css.chipIcon} aria-hidden="true">
      <use href="/sprite.svg#icon-fuel-pump" />
    </svg>
    {camper.engine}
  </span>

  {/* AC */}
  {has(camper.AC) && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-wind" />
      </svg>
      AC
    </span>
  )}

  {/* Kitchen */}
  {has(camper.kitchen) && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-kitchen" />
      </svg>
      Kitchen
    </span>
  )}

  {/* Bathroom */}
  {has(camper.bathroom) && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-shower" />
      </svg>
      Bathroom
    </span>
  )}

  {/* TV */}
  {camper.TV && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-tv" />
      </svg>
      TV
    </span>
  )}

  {/* Radio */}
  {camper.radio && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-radio" />
      </svg>
      Radio
    </span>
  )}


  {camper.refrigerator && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-fridge" />
      </svg>
      Refrigerator
    </span>
  )}


  {camper.microwave && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-microwave" />
      </svg>
      Microwave
    </span>
  )}


  {camper.gas && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-gas" />
      </svg>
      Gas
    </span>
  )}


  {camper.water && (
    <span>
      <svg className={css.chipIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-wind" />
      </svg>
      Water
    </span>
  )}
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