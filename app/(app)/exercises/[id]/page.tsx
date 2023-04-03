import { cookies } from 'next/headers';

import { ExerciseForm } from '../../../../components/exercise/ExerciseForm';
import { getUserFromCookie } from '../../../../lib/auth';
import { db } from '../../../../lib/db';

type ExerciseProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: { params: any }) {
    const { exercise } = await getData(params.id);

    return {
        title: exercise?.name ?? '',
    };
}

async function getData(id: string) {
    const user = await getUserFromCookie(cookies());

    if (!user) {
        return {
            exercise: null,
        };
    }

    const exercise = await db.exercise.findFirst({
        where: {
            id,
            userId: user.id,
        },
    });

    return { exercise };
}

export default async function Exercise(props: ExerciseProps) {
    const { exercise } = await getData(props.params.id);

    if (!exercise) {
        return null;
    }

    return (
        <ExerciseForm
            exercise={{
                id: exercise.id,
                name: exercise.name,
                notes: exercise.notes,
                recovery: exercise.recovery,
                serie: exercise.serie,
                weight: exercise.weight,
            }}
        />
    );
}
