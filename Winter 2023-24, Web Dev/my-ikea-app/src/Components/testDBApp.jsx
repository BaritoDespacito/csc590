import React, { useEffect, useState } from 'react';
import DatabaseService from '../database.js';
import Product from '../Models/productModel.js';
import ProductType from '../Models/productTypeModel.js';
import { Link } from "react-router-dom";

function TestDBApp() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(new ProductType(
        "n/a", "n/a", "n/a", 0, []
    ))
    const [allDocs, setAllDocs] = useState([])

    const fetchData = async () => {
        // set the data to loading
        setLoading(true)

        // get the data
        const res = await DatabaseService.TestReadProductType()
        const resAllDocs = await DatabaseService.ReadAllProductTypes()

        // show the data in console
        console.log("res is ", res)
        console.log("resAllDocs", resAllDocs)

        // stop loading
        setLoading(false)

        // set the data to the result
        setResult(res)
        setAllDocs(resAllDocs)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <center>
                <Link
                    key="linkToProductList"
                    to="/productList"
                >Product List</Link>
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
                        <h2>{result.productImage}</h2>
                        <br />
                        {allDocs.map((doc) => (
                            <h3 key={doc.productTypeID}>{doc.productName}</h3>
                        ))}
                    </div>
                }
            </center>
        </div>
    );
}

export default TestDBApp;