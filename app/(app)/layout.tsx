import { ReactNode } from 'react';
import '../globals.css';

export default function AuthRootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className="h-screen w-screen">
                <div className="w-full h-full bg-purple-900 text-white p-5">{children}</div>
            </body>
        </html>
    );
}
