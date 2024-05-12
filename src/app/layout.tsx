import type { Metadata } from "next";
import './globals.css'
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '@/context/AuthContext';
import { ThemeProvider } from "@/components/theme-provider"
import { ViewTransitions } from 'next-view-transitions'
import React from "react";

export const metadata: Metadata = {
    title: 'Z-Tube | Social Media Platform',
    description: 'This is a social media platform made By Rahul Das',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ViewTransitions>
            <html lang="en">
                <link rel="icon" href="/fave/icons8-z-color-32.png" sizes="any" />
                <body className='scroll-smooth'>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <ToastContainer draggableDirection="x" pauseOnFocusLoss={false} transition={Flip} />
                        <AuthContextProvider>
                            {children}
                        </AuthContextProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    )
}
