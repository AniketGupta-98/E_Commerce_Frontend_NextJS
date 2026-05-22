import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    type CreateCategoryPayload,
    type UpdateCategoryPayload,
} from '../services/categoryService';

export const CATEGORIES_KEY = ['categories'] as const;

export function useCategories() {
    return useQuery({
        queryKey: CATEGORIES_KEY,
        queryFn: fetchCategories,
        staleTime: 5 * 60 * 1000,   // 5 min — categories change rarely
        gcTime: 10 * 60 * 1000,     // keep in cache for 10 min after unmount
    });
}

export function useCreateCategory() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: CATEGORIES_KEY }),
    });
}

export function useUpdateCategory() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateCategoryPayload }) =>
            updateCategory(id, payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: CATEGORIES_KEY }),
    });
}

/** Delete a category — auto-invalidates the list on success */
export function useDeleteCategory() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: CATEGORIES_KEY }),
    });
}
