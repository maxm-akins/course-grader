'use client';

import { SchoolProvider } from "./SchoolProvider";
import { AuthProvider } from "./AuthProvider";

export function Providers({ children }) {
    return (
        <AuthProvider>
            <SchoolProvider>
                { children }
            </SchoolProvider>
        </AuthProvider>
    );
}