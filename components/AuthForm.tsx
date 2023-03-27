'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { register, signin } from '../lib/api';
import { Button } from './core/Button';
import { InputText } from './input/InputText';

type AuthFormProps = {
    mode?: 'signin' | 'register';
};

const initial = { email: '', password: '' };

export function AuthForm(props: AuthFormProps) {
    const { mode = 'signin' } = props;

    const [formState, setFormState] = React.useState({ ...initial });
    const [submitting, setSubmitting] = React.useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSubmitting(true);

        try {
            if (mode === 'signin') {
                await signin({ email: formState.email, password: formState.password });
            } else {
                await register({
                    email: formState.email,
                    password: formState.password,
                });
            }

            router.push(mode === 'signin' ? '/' : '/login');
            setFormState(initial);
        } catch (e) {
            // TODO handle error
            console.error(e);
            setSubmitting(false);
        }
    }

    return (
        <form className="w-full px-5" onSubmit={handleSubmit}>
            <InputText
                name="email"
                label="Email"
                value={formState.email}
                onChange={(value) => {
                    setFormState((oldValue) => ({ ...oldValue, email: value }));
                }}
            />

            <InputText
                type="password"
                name="password"
                label="Password"
                value={formState.password}
                onChange={(value) => {
                    setFormState((oldValue) => ({ ...oldValue, password: value }));
                }}
            />

            <Button label={mode === 'signin' ? 'Login' : 'Signin'} type="submit" disabled={submitting} />
        </form>
    );
}
