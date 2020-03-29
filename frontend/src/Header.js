import React from 'react';

export default function Header({ children, title }) {
    return (
        <header>
            <h1>{children} {title}</h1>
        </header>
    )
}

