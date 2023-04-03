import Link from 'next/link';
import { Suspense } from 'react';

import { Spinner } from '../../components/core/Spinner';
import { TrainingList } from '../../components/training/TrainingList';

export default function Home() {
    return (
        <>
            <h1 className="text-4xl">Schede</h1>

            <Suspense fallback={<Spinner />}>
                {/* @ts-expect-error Async Server Component */}
                <TrainingList />
            </Suspense>

            <div className="flex flex-col gap-1 items-center justify-center">
                <Link href={'/training/create/'}>Crea nuova scheda</Link>
                <Link href={'/exercises'}>Esercizi</Link>
            </div>
        </>
    );
}

export const metadata = {
    title: 'GymTracker - Homepage',
};
