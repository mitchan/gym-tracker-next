import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../lib/auth';
import { db } from '../../lib/db';
import ExerciseCard from './ExerciseCard';

async function getData() {
    const user = await getUserFromCookie(cookies());

    if (!user) {
        return { exercises: [] };
    }

    const exercises = await db.exercise.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            name: 'asc',
        },
    });

    return { exercises };
}

export async function ExerciseList() {
    const { exercises } = await getData();

    return (
        <div className="my-2">
            {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </div>
    );
}
