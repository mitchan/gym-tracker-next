import { Spinner } from './Spinner';

export function Loading() {
    return (
        <div className="fixed inset-x-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <Spinner />
        </div>
    );
}
