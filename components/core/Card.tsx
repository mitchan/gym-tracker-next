import React from 'react';

export function Card(props: { children: React.ReactNode }) {
    return (
        <div className="border border-solid border-yellow-700 bg-yellow-700 p-2 rounded shadow-lg mb-2">
            {props.children}
        </div>
    );
}
