import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data is considered fresh for 30 seconds — avoids redundant refetches
            staleTime: 30 * 1000,
            // Retry once on failure before surfacing the error
            retry: 1,
            // Refetch when the window regains focus
            refetchOnWindowFocus: true,
        },
        mutations: {
            retry: 0,
        },
    },
});
