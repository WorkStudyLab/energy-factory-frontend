export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  brand: string;
  weight: number;
  weightUnit: string;
  stock: number;
  status: string;
  tags: string[];
}

export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pageInfo: PageInfo;
}

export interface ApiResponse<T> {
  status: number;
  code: string;
  desc: string;
  data: T;
}

export interface ProductFilters {
  category?: string;
  keyword?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  size?: number;
}