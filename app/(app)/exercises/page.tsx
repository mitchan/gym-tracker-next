import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../../lib/auth';
import { db } from '../../../lib/db';
import Link from 'next/link';
import ExerciseCard from '../../../components/ExerciseCard';

async function getData() {
    const user = await getUserFromCookie(cookies());

    if (!user) {
        [];
    }

    const exercises = await db.exercise.findMany({
        where: {
            userId: user?.id,
        },
    });

    return { exercises };
}

export default async function Exercises() {
    const { exercises } = await getData();

    return (
        <>
            <h1 className="text-4xl">Esercizi</h1>

            <Link href="/exercices/create">Crea nuova esercizio</Link>

            <div className="my-2">
                {exercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </>
    );
}
