import React, { useEffect, useState } from 'react';
import DatabaseService from '../database.js';
import Product from '../Models/productModel.js';
import ProductType from '../Models/productTypeModel.js';

function TestDBApp() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(new ProductType(
        "n/a", "n/a", "n/a", 0, []
    ))

    const fetchData = async () => {
        // set the data to loading
        setLoading(true)

        // get the data
        const res = await DatabaseService.TestReadProductType()

        // show the data in console
        console.log(res)

        // stop loading
        setLoading(false)

        // set the data to the result
        setResult(res)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>

            <h1>testdbapp</h1>

            { loading && 
                <h2>loading...</h2>
            }
            
            { !loading &&
                <div>
                    <h2>{result.productTypeID}</h2>
                    <h2>{result.productName}</h2>
                    <h2>{result.productCategoryID}</h2>
                    <h2>{result.price}</h2>
                    <h2>{result.productArray}</h2>
                </div>
            }

        </div>
    );
}

export default TestDBApp;