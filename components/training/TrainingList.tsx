import { Training } from '@prisma/client';
import { getUserFromCookie } from '../../lib/auth';
import { cookies } from 'next/headers';
import { db } from '../../lib/db';
import Link from 'next/link';
import { Card } from '../core/Card';

async function getData(): Promise<Training[]> {
    const user = await getUserFromCookie(cookies());

    if (!user) {
        [];
    }

    return db.training.findMany({
        where: {
            userId: user?.id,
        },
        orderBy: {
            title: 'asc',
        },
    });
}

export async function TrainingList() {
    const trainings = await getData();

    return (
        <>
            {trainings.map((training) => (
                <Link key={training.id} href={`/training/${training.id}`}>
                    <Card>{training.title}</Card>
                </Link>
            ))}
        </>
    );
}
