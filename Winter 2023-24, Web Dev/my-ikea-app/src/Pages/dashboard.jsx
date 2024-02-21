import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    return(
        <center>
            <h1>DASHBOARD</h1>
            { loading 
                ? <h3>LOADING</h3>
                : <div>
                    <h4>LOW STOCK: </h4>
                    <table className="lowStockTable">
                        {lowStockArray.map((product) => (
                            <tbody key={product.productName}>
                                <tr>
                                    <td className="lowStockTableData">
                                        <center>
                                            <button id={product.productTypeID} className="lowStockButton" onClick={(event) => {
                                                // console.log('hi')
                                                console.log(event.target.id)
                                                navigate('/productDetail', { state: { productTypeID:event.target.id } });
                                            }}>
                                                Product: {product.productName}
                                                <br />
                                                Quantity: {product.productStockArray.length}
                                            </button>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <br />

                </div>
            }
        </center>
    );
}

export default Dashboard;