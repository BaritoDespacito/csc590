import React, { useEffect } from 'react';
import DatabaseService from '../database.js';

function TestDBApp ({}) {

    useEffect(() => {
        console.log('hello this is useeffect');
    });

    DatabaseService.dbTestAdd();

    return (
        <div>testdbapp</div>
    );
}

export default TestDBApp;