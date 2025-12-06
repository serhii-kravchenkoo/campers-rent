"use client";

import { useEffect } from "react";
import css from "./CatalogPage.module.css";
import { useCampersStore } from "@/lib/store/campersStore";
import FiltersComponent from "@/components/Filters/Filters";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";

export default function CatalogPage() {
  const { campers, isLoading, error, fetchCampers, loadMore } =
    useCampersStore();

  useEffect(() => {
    if (campers.length === 0) {
      fetchCampers({ reset: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className={css.page}>
      <div className="container">
        <div className={css.layout}>
          <aside className={css.sidebar}>
            <FiltersComponent />
          </aside>

          <section className={css.listSection}>
            {isLoading && campers.length === 0 && <Loader />}
            {error && <p className={css.error}>{error}</p>}

            <ul className={css.list}>
              {campers.map((camper) => (
                <li key={camper.id}>
                  <CamperCard camper={camper} />
                </li>
              ))}
            </ul>

            {campers.length > 0 && (
              <div className={css.loadMoreWrapper}>
                <button
                  type="button"
                  className={css.loadMore}
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}