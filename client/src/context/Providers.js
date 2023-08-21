'use client';

import { SchoolProvider } from "./SchoolProvider";
import { AuthProvider } from "./AuthProvider";
import { LoadingProvider } from "./LoadingContext";
import { ResponseProvider } from "./ResponseContext";
export function Providers({ children }) {
    return (
        <LoadingProvider>
            <AuthProvider>
                <SchoolProvider>
                    <ResponseProvider>
                        { children }
                    </ResponseProvider>
                </SchoolProvider>
            </AuthProvider>
        </LoadingProvider>

    );
}