import { PlusIcon } from '@heroicons/react/24/solid';
import { cookies } from 'next/headers';
import Link from 'next/link';

import ExerciseCard from '../../../../components/exercise/ExerciseCard';
import { getUserFromCookie } from '../../../../lib/auth';
import { db } from '../../../../lib/db';

type ExerciseProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: { params: any }) {
    const { training } = await getData(params.id);

    return {
        title: training?.title ?? '',
    };
}

async function getData(id: string) {
    const user = await getUserFromCookie(cookies());

    if (!user) {
        return {
            training: null,
        };
    }

    const training = await db.training.findFirst({
        where: {
            id,
            userId: user.id,
        },
        include: {
            exercises: {
                select: {
                    exercice: true,
                },
            },
        },
    });

    return { training };
}

export default async function Training(props: ExerciseProps) {
    const { training } = await getData(props.params.id);

    if (!training) {
        return null;
    }

    return (
        <>
            <h1 className="text-4xl mb-5">{training.title}</h1>

            {training.exercises.map(({ exercice }) => (
                <ExerciseCard key={exercice.id} exercise={exercice} showCount />
            ))}

            <div className="flex items-center justify-center">
                <PlusIcon className="h-6 w-6 mr-2" />
                <Link href={`/training/${props.params.id}/add-exercise`}>Aggiungi esercizio</Link>
            </div>

            {/* <TrainingForm
                training={{
                    id: training.id,
                    title: training.title,
                }}
            /> */}
        </>
    );
}
