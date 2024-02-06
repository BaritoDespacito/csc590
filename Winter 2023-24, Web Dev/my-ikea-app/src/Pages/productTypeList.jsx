import React, { useEffect, useState } from "react";
import DatabaseService from "../database.js";
import ProductTypePreview from "../Components/productTypePreview.jsx";

function ProductTypeList() {
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

    return(
        <div>
            <center>
                <h1>PRODUCTS</h1>
                { loading
                    ? <h2>LOADING</h2>
                    : <div>
                        {allProductTypes.map((product) => (
                            <div>
                                <ProductTypePreview
                                    product={product}
                                ></ProductTypePreview>
                                <br />
                            </div>
                        ))}
                    </div>
                }
                
            </center>
        </div>
    );
}

export default ProductTypeList;