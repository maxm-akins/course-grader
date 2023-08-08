'use client';

import { SchoolProvider } from "./SchoolProvider";

export function Providers({ children }) {
    return (
        <SchoolProvider>
            { children }
        </SchoolProvider>
    );
}