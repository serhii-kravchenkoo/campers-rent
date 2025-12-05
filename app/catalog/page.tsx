"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useCampersStore } from "@/store/campersStore";
import { buildFiltersFromSearchParams } from "@/utils/getFiltersFromParams";
import Filters from "@/components/CatalogFilters/CatalogFilters";
import List from "@/components/List/List";
import css from "./Catalog.module.css";

export default function CatalogPage() {
  const sp = useSearchParams();

  const filters = useMemo(() => buildFiltersFromSearchParams(sp), [sp]);

  const loadFirstPage = useCampersStore((s) => s.loadFirstPage);

  useEffect(() => {
    loadFirstPage(filters);
  }, [filters, loadFirstPage]);

  return (
    <main className={css.catalog}>
      <div className="container">
        <div className={css.layout}>
          <Filters />
          <List />
        </div>
      </div>
    </main>
  );
}