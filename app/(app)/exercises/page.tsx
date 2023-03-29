import Link from 'next/link';
import { ExerciseList } from '../../../components/exercise/ExerciseList';
import { Suspense } from 'react';

export default async function Exercises() {
    return (
        <>
            <h1 className="text-4xl">Esercizi</h1>

            <Link href="/exercises/create">Crea nuova esercizio</Link>

            <Suspense fallback={<div>Loading</div>}>
                {/* @ts-expect-error Async Server Component */}
                <ExerciseList />
            </Suspense>
        </>
    );
}
