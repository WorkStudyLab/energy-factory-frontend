import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProductFilters } from "@/types/product";

interface ProductsStoreState {
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  setCategory: (category: string) => void;
  setKeyword: (keyword: string) => void;
  setSort: (sort: string) => void;
  setPage: (page: number) => void;
  setPriceRange: (minPrice?: number, maxPrice?: number) => void;
}

const initialFilters: ProductFilters = {
  page: 0,
  size: 20,
  sort: "createdAt,desc",
};

export const useProductsStore = create<ProductsStoreState>()(
  devtools(
    (set) => ({
      filters: initialFilters,

      setFilters: (newFilters) =>
        set(
          (state) => ({
            filters: { ...state.filters, ...newFilters },
          }),
          false,
          "setFilters"
        ),

      resetFilters: () =>
        set(
          { filters: initialFilters },
          false,
          "resetFilters"
        ),

      setCategory: (category) =>
        set(
          (state) => ({
            filters: { ...state.filters, category, page: 0 },
          }),
          false,
          "setCategory"
        ),

      setKeyword: (keyword) =>
        set(
          (state) => ({
            filters: { ...state.filters, keyword, page: 0 },
          }),
          false,
          "setKeyword"
        ),

      setSort: (sort) =>
        set(
          (state) => ({
            filters: { ...state.filters, sort, page: 0 },
          }),
          false,
          "setSort"
        ),

      setPage: (page) =>
        set(
          (state) => ({
            filters: { ...state.filters, page },
          }),
          false,
          "setPage"
        ),

      setPriceRange: (minPrice, maxPrice) =>
        set(
          (state) => ({
            filters: { ...state.filters, minPrice, maxPrice, page: 0 },
          }),
          false,
          "setPriceRange"
        ),
    }),
    {
      name: "products-store",
    }
  )
);