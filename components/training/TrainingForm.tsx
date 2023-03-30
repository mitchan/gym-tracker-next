'use client';

import React from 'react';
import { InputText } from '../input/InputText';
import { Button } from '../core/Button';
import { UpdateTraining } from '../../lib/types';
import { create_training, update_training } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { Loading } from '../core/Loading';

type TrainingFormProps = {
    training?: UpdateTraining;
};

export function TrainingForm(props: TrainingFormProps) {
    const { training } = props;

    const [title, setTitle] = React.useState(training?.title ?? '');
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            if (training) {
                // update
                await update_training({ id: training.id, title });
            } else {
                // create
                await create_training({ title });
            }

            router.push('/');
        } catch (error) {
            // TODO handle error
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Loading />}

            <h1 className="text-4xl">{training ? 'Modifica esercizio' : 'Nuovo esercizio'}</h1>

            <form onSubmit={handleSubmit}>
                <InputText name="title" label="Descrizione" value={title} onChange={setTitle} />

                <Button label={training ? 'Modifica' : 'Crea'} type="submit" disabled={loading} />
            </form>
        </>
    );
}
