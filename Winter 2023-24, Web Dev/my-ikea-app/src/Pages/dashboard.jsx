import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Timestamp, toDate } from "firebase/firestore";
import CustomerOrder from "../Models/customerOrderModel.js"
import DatabaseService from "../database";
import '../Styling/dashboard.css'

function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [lowStockArray, setLowStockArray] = useState([])
    const [customerOrderArray, setCustomerOrderArray] = useState([])
    const [showCustomerOrder, setShowCustomerOrder] = useState(false)
    const [currentCustomerOrder, setCurrentCustomerOrder] = useState(new CustomerOrder(
        "0", "0", 0, [], Date()
    ))

    const fetchData = async () => {
        // set the data to loading
        setLoading(true)

        // get the data
        const res = await DatabaseService.ReadLowestStock()
        const res2 = await DatabaseService.ReadCustomerOrders()

        // show the data in console
        console.log("data", res[0], res[1], res[2])
        console.log('data 2', res2[0], res2[1], res2[2])

        // stop loading
        setLoading(false)

        // set the data to the result
        setLowStockArray(res)
        setCustomerOrderArray(res2)
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
                    <h4>RECENT CUSTOMER ORDERS:</h4>
                    <table className="lowStockTable">
                        {customerOrderArray.map((order) => (
                            <tbody key={order.orderNumber}>
                                <tr>
                                    <td className="lowStockTableData">
                                        <center>
                                            <button id={order.orderNumber} className="lowStockButton" onClick={(event) => {
                                                setShowCustomerOrder(true)
                                                setCurrentCustomerOrder(order)
                                            }}>
                                                Order Number: {order.orderNumber}
                                                <br />
                                                Time: {order.time.toDate().toDateString()}
                                            </button>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <br />
                    { showCustomerOrder 
                        ? <div>
                            Order Number: {currentCustomerOrder.orderNumber}
                            <br />
                            Customer ID: {currentCustomerOrder.customerID}
                            <br />
                            Price: {currentCustomerOrder.price}
                            <br />
                            Products: {currentCustomerOrder.productArray.toString()}
                            <br />
                            Time: {currentCustomerOrder.time.toDate().toDateString()}
                        </div>
                        : <div></div>
                    }
                </div>
            }
        </center>
    );
}

export default Dashboard;