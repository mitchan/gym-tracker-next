'use client';

import React from 'react';
import { InputText } from '../input/InputText';
import { Button } from '../core/Button';
import { useRouter } from 'next/navigation';
import { CreateExercise, UpdateExercise } from '../../lib/types';
import { create_exercise, update_exercise } from '../../lib/api';

type ExerciseFormProps = {
    exercise?: UpdateExercise;
};

export function ExerciseForm(props: ExerciseFormProps) {
    const { exercise } = props;

    const [formState, setFormState] = React.useState<CreateExercise>({
        name: exercise?.name ?? '',
        serie: exercise?.serie ?? '',
        recovery: exercise?.recovery ?? '',
        weight: exercise?.weight ?? 0,
        notes: exercise?.notes ?? '',
    });
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            if (exercise) {
                // EDIT
                await update_exercise({ ...formState, id: exercise.id });
            } else {
                // CREATE
                await create_exercise(formState);
            }
            router.push('/exercises');
        } catch (e) {
            // TODO handle error
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-4xl">Nuovo esercizio</h1>

            <form onSubmit={handleSubmit}>
                <InputText
                    name="name"
                    label="Nome"
                    value={formState.name}
                    onChange={(value) => {
                        setFormState((oldState) => ({
                            ...oldState,
                            name: value,
                        }));
                    }}
                />

                <InputText
                    name="serie"
                    label="Serie"
                    value={formState.serie}
                    onChange={(value) => {
                        setFormState((oldState) => ({
                            ...oldState,
                            serie: value,
                        }));
                    }}
                />

                <InputText
                    name="recovery"
                    label="Recupero"
                    value={formState.recovery}
                    onChange={(value) => {
                        setFormState((oldState) => ({
                            ...oldState,
                            recovery: value,
                        }));
                    }}
                />

                <InputText
                    name="weight"
                    type="number"
                    label="Peso"
                    value={formState.weight}
                    onChange={(value) => {
                        setFormState((oldState) => ({
                            ...oldState,
                            weight: Number(value),
                        }));
                    }}
                />

                <InputText
                    name="notes"
                    label="Note"
                    value={formState.notes ?? ''}
                    onChange={(value) => {
                        setFormState((oldState) => ({
                            ...oldState,
                            notes: value,
                        }));
                    }}
                />

                <Button label={props.exercise ? 'Modifica' : 'Crea'} type="submit" disabled={loading} />
            </form>
        </>
    );
}
