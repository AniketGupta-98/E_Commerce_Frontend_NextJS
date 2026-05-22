import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    type CreateUserPayload,
    type UpdateUserPayload,
} from '../services/userService';

export const USERS_KEY = ['users'] as const;

/** Fetch all users */
export function useUsers() {
    return useQuery({
        queryKey: USERS_KEY,
        queryFn: fetchUsers,
        staleTime: 1 * 60 * 1000,   // 1 min — user data is admin-sensitive
        gcTime: 3 * 60 * 1000,      // keep in cache for 3 min after unmount
    });
}

/** Create (invite) a new user — auto-invalidates the list on success */
export function useCreateUser() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateUserPayload) => createUser(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
    });
}

/** Update an existing user — auto-invalidates the list on success */
export function useUpdateUser() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
    });
}

/** Delete a user — auto-invalidates the list on success */
export function useDeleteUser() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, email }: { userId: string; email: string }) =>
            deleteUser(userId, email),
        onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
    });
}
