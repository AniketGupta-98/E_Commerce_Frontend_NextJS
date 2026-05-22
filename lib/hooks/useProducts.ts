import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';

export const PRODUCTS_KEY = ['products'] as const;

/** Fetch all products */
export function useProducts() {
    return useQuery({
        queryKey: PRODUCTS_KEY,
        queryFn: fetchProducts,
        staleTime: 2 * 60 * 1000,   // 2 min — products change moderately
        gcTime: 5 * 60 * 1000,      // keep in cache for 5 min after unmount
    });
}
