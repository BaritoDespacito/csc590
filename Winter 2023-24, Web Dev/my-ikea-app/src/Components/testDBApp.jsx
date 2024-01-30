import React, { useEffect } from 'react';
import DatabaseService from '../database.js';

function TestDBApp ({}) {

    useEffect(() => {
        console.log('hello this is useeffect');
    });

    DatabaseService.TestAdd();
    DatabaseService.TestRead();

    return (
        <div>testdbapp</div>
    );
}

export default TestDBApp;