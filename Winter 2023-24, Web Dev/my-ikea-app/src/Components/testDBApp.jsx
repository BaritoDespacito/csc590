import React, { useEffect } from 'react';
import DatabaseService from '../database.js';
import Product from '../Models/productModel.js'

function TestDBApp ({}) {

    useEffect(() => {
        console.log('hello this is useeffect');
    });

    DatabaseService.TestAdd();
    DatabaseService.TestRead();

    const testProduct = new Product(0, 'sampleName', 0, 0, false);

    return (
        <div>
            <h1>testdbapp</h1>
            <h2>{testProduct.productName}</h2>
        </div>
    );
}

export default TestDBApp;