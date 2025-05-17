"use client";
import {Roboto_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider, useTheme} from "./theme-context";

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
    display: "swap",
});

function BodyWithTheme({children}: { children: React.ReactNode }) {
    const {theme} = useTheme();
    return (
        <div className={`bg-background text-foreground theme-${theme} font-robotoMono`}>
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