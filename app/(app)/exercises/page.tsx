import Link from 'next/link';
import { Suspense } from 'react';

import { Spinner } from '../../../components/core/Spinner';
import { ExerciseList } from '../../../components/exercise/ExerciseList';

export default async function Exercises() {
    return (
        <>
            <h1 className="text-4xl">Esercizi</h1>

            <Link href="/exercises/create">Crea nuova esercizio</Link>

            <Suspense fallback={<Spinner />}>
                {/* @ts-expect-error Async Server Component */}
                <ExerciseList />
            </Suspense>
        </>
    );
}
