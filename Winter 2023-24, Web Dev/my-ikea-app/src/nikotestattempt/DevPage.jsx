import React, { useEffect, useState } from "react";
import DatabaseService from "../database.js";
import ShowProduct from "./ShowProduct.jsx";

function DevPage() {
    // gets all the product types

    const [allProductTypes, setAllProductTypes] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        // set the data to loading
        setLoading(true)

        // get the data
        const resAllDocs = await DatabaseService.ReadAllProductTypes()

        // show the data in console
        console.log("resAllDocs", resAllDocs)

        // stop loading
        setLoading(false)

        // set the data to the result
        setAllProductTypes(resAllDocs)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            {
                loading
                    ? <h1>wait smh</h1>
                    : <div>
                        {allProductTypes.map((product) => (
                            <ShowProduct key = {product.productTypeID} props = {product} />
                        ))}
                    </div>
            }
        </div>
    )
}

export default DevPage