import React, { useState, useEffect } from "react";
import DatabaseService from "../database";
import '../Styling/dashboard.css'

function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [lowStockArray, setLowStockArray] = useState([])

    const fetchData = async () => {
        // set the data to loading
        setLoading(true)

        // get the data
        const res = await DatabaseService.ReadLowestStock()

        // show the data in console
        console.log("data", res[0], res[1], res[2])

        // stop loading
        setLoading(false)

        // set the data to the result
        setLowStockArray(res)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <center>
            <h1>DASHBOARD</h1>
            { loading 
                ? <h3>LOADING</h3>
                : <table className="lowStockTable">
                    {lowStockArray.map((product) => (
                        <tbody key={product.productName}>
                            <tr>
                                <td className="lowStockTableData">
                                    <center>
                                        {product.productName}
                                    </center>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            }
        </center>
    );
}

export default Dashboard;