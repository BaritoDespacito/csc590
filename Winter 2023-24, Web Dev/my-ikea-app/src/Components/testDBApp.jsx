import React, { useEffect } from 'react';
import DatabaseService from '../database.js';
import Product from '../Models/productModel.js'

function TestDBApp ({}) {

    useEffect(() => {
        console.log('hello this is useeffect');
    });

    DatabaseService.TestAdd();
    DatabaseService.TestRead();

    const testProduct = Product(
        id = 0,
        productName = 'sampleProduct',
        type = 0,
        category = 0,
        sold = false,
    );

    return (
        <div>
            <h1>testdbapp</h1>
            <h2>{testProduct.productName}</h2>
        </div>
    );
}

export default TestDBApp;