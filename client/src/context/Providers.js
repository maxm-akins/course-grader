'use client';

import { SchoolProvider } from "./SchoolProvider";
import { AuthProvider } from "./AuthProvider";
import { LoadingProvider } from "./LoadingContext";

export function Providers({ children }) {
    return (
        <LoadingProvider>
            <AuthProvider>
                <SchoolProvider>
                    { children }
                </SchoolProvider>
            </AuthProvider>
        </LoadingProvider>

    );
}