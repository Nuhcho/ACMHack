"use client";
// acm-hack/app/layout.tsx
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider, useTheme} from "./theme-context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// export const metadata: Metadata = { ... };

function BodyWithTheme({children}: { children: React.ReactNode }) {
    const {theme} = useTheme();
    return (
        <div className={`bg-background text-foreground theme-${theme}`}>
            {children}
        </div>
    );
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider>
            <BodyWithTheme>{children}</BodyWithTheme>
        </ThemeProvider>
        </body>
        </html>
    );
}