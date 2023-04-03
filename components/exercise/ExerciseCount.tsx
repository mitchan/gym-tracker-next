'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

type ExerciseCountProps = {
    exerciseId: string;
};

export function ExerciseCount(props: ExerciseCountProps) {
    const { exerciseId } = props;

    const valueFromLS = localStorage.getItem(exerciseId);

    const [count, setCount] = React.useState(valueFromLS ? Number(valueFromLS) : 0);

    React.useEffect(() => {
        localStorage.setItem(exerciseId, `${count}`);
    }, [count, exerciseId]);

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
