import '../globals.css';

import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';

import { getUserFromCookie } from '../../lib/auth';

async function getUser() {
    return getUserFromCookie(cookies());
}

const baseClasses = 'w-full h-full bg-purple-900 text-white';

export default async function AuthRootLayout({ children }: { children: ReactNode }) {
    const user = await getUser();

    return (
        <html lang="en">
            <head />
            <body className="h-screen w-screen">
                {user ? (
                    <div className={`${baseClasses} p-5`}>{children}</div>
                ) : (
                    <div className={`${baseClasses} flex flex-col items-center justify-center gap-5`}>
                        <p>Non sei autenticato.</p>

                        <p>
                            Accedi alla pagina di{' '}
                            <Link href="/login" className="underline">
                                Login
                            </Link>{' '}
                            per autenticarti.
                        </p>
                    </div>
                )}
            </body>
        </html>
    );
}
