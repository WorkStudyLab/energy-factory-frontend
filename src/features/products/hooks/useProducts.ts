import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductFilters } from "@/types/product";

const fetchProducts = async (filters?: ProductFilters) => {
  const params: Record<string, string> = {};

  if (filters) {
    (Object.keys(filters) as Array<keyof ProductFilters>).forEach((key) => {
      const value = filters[key];
      if (value !== "" && value != null) {
        params[key] = String(value);
      }
    });
  }

  const response = await axios.get("/api/products", { params });

  return response.data.data;
};

export const useProducts = (filter?: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => fetchProducts(filter),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};
