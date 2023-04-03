'use client';

import React from 'react';

type CardProps = { children: React.ReactNode; onClick?: () => void };

export function Card(props: CardProps) {
    return (
        <div
            className="border border-solid border-yellow-700 bg-yellow-700 p-2 rounded shadow-lg mb-2"
            onClick={() => props.onClick?.()}
        >
            {props.children}
        </div>
    );
}
