import { cookies } from 'next/headers';
import Link from 'next/link';

import { ExerciseForm } from '../../../../components/exercise/ExerciseForm';
import { TrainingForm } from '../../../../components/training/TrainingForm';
import { getUserFromCookie } from '../../../../lib/auth';
import { db } from '../../../../lib/db';

type ExerciseProps = {
    params: { id: string };
};

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
            <TrainingForm
                training={{
                    id: training.id,
                    title: training.title,
                }}
            />

            <Link href={`/training/${props.params.id}/add-exercise`}>Aggiungi esercizio</Link>
        </>
    );
}
