'use client';

import { Exercise } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { add_exercise } from '../../lib/api';
import { Loading } from '../core/Loading';
import ExerciseCard from '../exercise/ExerciseCard';

type AddExerciseProps = {
    trainingId: string;
    exercises: Pick<Exercise, 'id' | 'name' | 'notes' | 'recovery' | 'serie' | 'weight'>[];
};

export function AddExercise(props: AddExerciseProps) {
    const { exercises } = props;

    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    async function handleAddExercise(exercise: { id: string }) {
        setLoading(true);

        try {
            await add_exercise({ trainingId: props.trainingId, exerciseId: exercise.id });
            router.push(`/training/${props.trainingId}`);
        } catch (e) {
            // TODO handle error
            console.error(e);
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Loading />}

            <div className="my-2">
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={{
                            id: exercise.id,
                            name: exercise.name,
                            notes: exercise.notes,
                            recovery: exercise.recovery,
                            serie: exercise.serie,
                            weight: exercise.weight,
                        }}
                        onClick={() => {
                            handleAddExercise(exercise);
                        }}
                    />
                ))}

                {exercises.length === 0 && <p>Nessun esercizio da aggiungere.</p>}
            </div>
        </>
    );
}
