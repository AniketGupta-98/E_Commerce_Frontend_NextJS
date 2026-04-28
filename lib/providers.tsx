"use client";

import React from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./store";
import { queryClient } from "./queryClient";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Provider>
    );
}

/** @deprecated use AppProviders */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <AppProviders>{children}</AppProviders>;
}
