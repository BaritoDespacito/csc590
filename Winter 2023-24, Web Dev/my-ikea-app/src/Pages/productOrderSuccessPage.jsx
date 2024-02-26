import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatabaseService from '../database';

function ProductOrderSuccessPage() {

    // ProductOrderSuccessPage is a page used once a product order has successfully been created. It fetches the most recent product order (the one just created) and displays a summary.

    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState(false)
    const [quantity, setQuantity] = useState(false)

    const fetchData = async () => {
        // set the page to loading
        setLoading(true)

        // get the data
        const res = await DatabaseService.ReadLastProductOrder()

        // stop loading
        setLoading(false)

        // set the data to the result
        setProductName(res[0])
        setQuantity(res[1])
    }

    useEffect(() => {
        // fetch data on load
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