import './globals.css'
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '@/context/AuthContext';
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from '@/context/DataContext';
import { ViewTransitions } from 'next-view-transitions'

export const metadata = {
    title: 'Z-Tube | Social Media Platform',
    description: 'This is a social media platform made By Rahul Das',
}

export default function RootLayout({ children }) {
    return (
        <ViewTransitions>
            <html lang="en">
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <body className='scroll-smooth'>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <ToastContainer draggableDirection="x" pauseOnFocusLoss={false} transition={Flip} />
                        <AuthContextProvider>
                            <DataProvider>
                                {children}
                            </DataProvider>
                        </AuthContextProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    )
}
