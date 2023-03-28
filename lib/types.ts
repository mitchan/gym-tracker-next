import { Exercise } from '@prisma/client';

export type CreateExercise = Pick<Exercise, 'name' | 'serie' | 'recovery' | 'weight' | 'notes'>;
export type UpdateExercise = CreateExercise & { id: string };
