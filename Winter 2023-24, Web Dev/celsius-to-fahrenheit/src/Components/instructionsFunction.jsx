import React from 'react';

function InstructionsFunction({flour, eggs, sugar, unit}) {
    return (
        <div>
            <p>Put {flour} {unit} of flour, {eggs} {unit} of eggs and {sugar} {unit} of sugar into a bowl.</p>
        </div>
    );
}

export default InstructionsFunction;