'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Exercise } from '@prisma/client';
import React from 'react';

type ExerciseCountProps = {
    exercise: Exercise;
};

export function ExerciseCount(props: ExerciseCountProps) {
    const { exercise } = props;

    const valueFromLS = localStorage.getItem(exercise.id);

    const [count, setCount] = React.useState(valueFromLS ? Number(valueFromLS) : 0);

    React.useEffect(() => {
        localStorage.setItem(exercise.id, `${count}`);
    }, [count, exercise.id]);

    return (
        <div className="mt-2 flex justify-around items-center">
            <button disabled={count === 0} onClick={() => setCount(count - 1)}>
                <MinusIcon className="h-6 w-6" />
            </button>

            {count}

            <button onClick={() => setCount(count + 1)}>
                <PlusIcon className="h-6 w-6" />
            </button>
        </div>
    );
}
