import React, { useEffect } from 'react';
import { dbTestAdd } from './../database.js';

function TestDBApp ({}) {

    useEffect(() => {
        console.log('hello this is useeffect');
        
    });

    dbTestAdd();

    return (
        <div>testdbapp</div>
    );
}

export default TestDBApp;