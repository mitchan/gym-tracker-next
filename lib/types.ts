import { Exercise, Training } from '@prisma/client';

export type CreateExercise = Pick<Exercise, 'name' | 'serie' | 'recovery' | 'weight' | 'notes'>;
export type UpdateExercise = CreateExercise & { id: string };

export type CreateTraining = Pick<Training, 'title'>;
export type UpdateTraining = CreateTraining & { id: string };

export type AddExercise = {
    trainingId: string;
    exerciseId: string;
};
