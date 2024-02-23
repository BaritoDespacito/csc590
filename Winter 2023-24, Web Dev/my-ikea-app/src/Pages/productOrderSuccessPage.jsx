import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatabaseService from '../database';

function ProductOrderSuccessPage() {
    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState(false)
    const [quantity, setQuantity] = useState(false)

    const fetchData = async () => {
        // set the data to loading
        setLoading(true)

        // get the data
        const res = await DatabaseService.ReadLastProductOrder()

        // show the data in console
        console.log("data", res[0], res[1])

        // stop loading
        setLoading(false)

        // set the data to the result
        setProductName(res[0])
        setQuantity(res[1])
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <center>
            <h1>PRODUCTS ORDERED SUCCESSFULLY</h1>
            <br />
            { loading 
                ? <div>
                    <h3>LOADING</h3>
                </div>
                : <div>
                    <h3>Product Ordered: {productName}</h3>
                    <h3>Quantity: {quantity}</h3>
                    <Link
                        key="linkToDashboard"
                        to="/"
                    >Back to Dashboard</Link>
                </div>
            }
        </center>
    );
}

export default ProductOrderSuccessPage;