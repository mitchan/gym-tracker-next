import Link from 'next/link';
import { TrainingList } from '../../components/training/TrainingList';
import { Suspense } from 'react';

export default function Home() {
    return (
        <>
            <h1 className="text-4xl">Schede</h1>

            <div className="flex flex-col gap-1 items-center justify-center my-5">
                <Link href={'/training/create/'}>Crea nuova scheda</Link>
                <Link href={'/exercises'}>Esercizi</Link>
            </div>

            <Suspense fallback={<div>Loading</div>}>
                {/* @ts-expect-error Async Server Component */}
                <TrainingList />
            </Suspense>
        </>
    );
}
