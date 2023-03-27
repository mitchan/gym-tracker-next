import { ReactNode } from 'react';
import '../globals.css';

export default function AuthRootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className="h-screen w-screen">
                <div className="w-full h-full flex items-center justify-center bg-purple-900 text-white">
                    {children}
                </div>
            </body>
        </html>
    );
}
