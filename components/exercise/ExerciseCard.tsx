import type { Exercise } from '@prisma/client';
import Link from 'next/link';
import { Card } from '../core/Card';

type ExerciseCardProps = {
    exercise: Exercise;
};

export default function ExerciseCard(props: ExerciseCardProps) {
    const { exercise } = props;

    return (
        <Link href={`/exercises/${exercise.id}`}>
            <Card>
                <div className="flex justify-between items-end mb-5">
                    <h2 className="text-xl truncate w-3/4">{exercise.name}</h2>

                    {exercise.serie}
                </div>

                <ul>
                    <li>Recupero: {exercise.recovery}</li>
                    {exercise.weight > 0 && <li>Peso: {exercise.weight} Kg</li>}
                    {exercise.notes && <li>{exercise.notes}</li>}
                </ul>
            </Card>
        </Link>
    );
}
