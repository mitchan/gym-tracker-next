import { Button } from '../../components/core/Button';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <h1 className="text-4xl">Schede</h1>

            <div className="mb-2">
                <div className="flex flex-col gap-1 items-center justify-center my-5">
                    <Link href={'/training/create/'}>Crea nuova scheda</Link>
                    <Link href={'/training/create/'}>Esercizi</Link>
                </div>
            </div>
        </>
    );
}
