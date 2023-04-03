import type { Exercise } from '@prisma/client';

import { Card } from '../core/Card';

type ExerciseCardProps = {
    exercise: Exercise;
    onClick?: () => void;
};

export default function ExerciseCard(props: ExerciseCardProps) {
    const { exercise } = props;

    return (
        <Card onClick={props.onClick}>
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
    );
}
