import React, { useEffect, useState } from 'react';
import DatabaseService from '../database.js';
import Product from '../Models/productModel.js';
import ProductType from '../Models/productTypeModel.js';
import { Link } from "react-router-dom";

function TestDBApp() {

    // TestDBApp is a testing component. Its purpose was to test the read/write functions for Firestore. It is not used in the final product.

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
                <br></br>
                {/* <Link
                    key = "nikotest"
                    to = "/nikoattempt"
                >nikooooooo</Link>
                <br></br>
                 <Link
                    key = "devtestignthinggyyyyy"
                    to = "/dev"
                >devtestignthinggyyyyy</Link> */}
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