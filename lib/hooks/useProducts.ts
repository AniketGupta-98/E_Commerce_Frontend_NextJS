import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';

export const PRODUCTS_KEY = ['products'] as const;

/** Fetch all products */
export function useProducts() {
    return useQuery({
        queryKey: PRODUCTS_KEY,
        queryFn: fetchProducts,
    });
}
