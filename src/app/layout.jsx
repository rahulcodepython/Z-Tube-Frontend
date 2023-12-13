import './globals.css'
import 'react-tooltip/dist/react-tooltip.css'
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from '@/context/Context';

export const metadata = {
    title: 'Z-Tube | Social Media Platform',
    description: 'This is a social media platform made By Rahul Das',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='h-[100vh]'>
                <ToastContainer draggableDirection="x" pauseOnFocusLoss={false} transition={Flip} />
                <ContextProvider>
                    {children}
                </ContextProvider>
            </body>
        </html>
    )
}
