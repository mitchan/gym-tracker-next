import { CreateExercise, CreateTraining, UpdateExercise, UpdateTraining } from './types';

export const fetcher = async ({
    url,
    method,
    body,
    json = true,
}: {
    url: string;
    method: string;
    body: any;
    json?: boolean;
}) => {
    const res = await fetch(url, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        // handle your errors
        throw new Error('API error');
    }

    if (json) {
        const data = await res.json();
        return data.data;
    }
};

type User = {
    email: string;
    password: string;
};

export const register = (user: User) => {
    return fetcher({ url: '/api/register', method: 'POST', body: user });
};

export const signin = (user: User) => {
    return fetcher({ url: '/api/signin', method: 'POST', body: user });
};

export const create_exercise = (body: CreateExercise) => {
    return fetcher({ url: '/api/exercise', method: 'POST', body });
};

export const update_exercise = (body: UpdateExercise) => {
    return fetcher({ url: '/api/exercise', method: 'PATCH', body });
};

export const create_training = (body: CreateTraining) => {
    return fetcher({ url: '/api/training', method: 'POST', body });
};

export const update_training = (body: UpdateTraining) => {
    return fetcher({ url: '/api/training', method: 'PATCH', body });
};
