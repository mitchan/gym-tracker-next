import { cookies } from 'next/headers';

import { AddExercise } from '../../../../../components/training/AddExercise';
import { getUserFromCookie } from '../../../../../lib/auth';
import { db } from '../../../../../lib/db';

type ExerciseProps = {
    params: { id: string };
};

async function getData(id: string) {
    const user = await getUserFromCookie(cookies());

    if (!user) {
        return {
            exercises: null,
        };
    }

    // get all exercises not already added to the training
    const exercises = await db.exercise.findMany({
        where: {
            userId: user.id,
            trainings: {
                none: {
                    trainingId: id,
                },
            },
        },
        select: {
            id: true,
            name: true,
            notes: true,
            serie: true,
            recovery: true,
            weight: true,
        },
        orderBy: {
            name: 'asc',
        },
    });

    return { exercises };
}

export default async function Training(props: ExerciseProps) {
    const { exercises } = await getData(props.params.id);

    if (!exercises) {
        return null;
    }

    return (
        <>
            <h1>Scegli un esercizio da aggiungere alla scheda</h1>

            <AddExercise trainingId={props.params.id} exercises={exercises} />
        </>
    );
}

export const metadata = {
    title: 'GymTracker - Aggiungi esercizio',
};
