import { useQuery } from "@tanstack/react-query";
import { ProductsRepository } from "../repositories/productsRepository";
import { useProductsStore } from "../stores/useProductsStore";
import type { ProductFilters } from "@/types/product";

const productsRepository = new ProductsRepository();

export const useProducts = (customFilters?: ProductFilters) => {
  const { filters } = useProductsStore();
  
  const finalFilters = customFilters ? { ...filters, ...customFilters } : filters;

  return useQuery({
    queryKey: ["products", finalFilters],
    queryFn: () => productsRepository.getProducts(finalFilters),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};