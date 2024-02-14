import React, { useEffect, useState } from "react";
import DatabaseService from "../database.js";
import InvRow from "./InvRow.jsx";

function InvPage() {
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
                { loading
                    ? <h2>LOADING</h2>
                    : <div className = "InvTable">
                        <table>
                            <tbody>
                                {allProductTypes.map((product) => (
                                    <InvRow key = {product.productTypeID} product = {product} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </center>
        </div>
    );
}

export default InvPage;