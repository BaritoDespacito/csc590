import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerOrder from "../Models/customerOrderModel.js"
import DatabaseService from "../database";
import '../Styling/dashboard.css'
import ProductOrder from "../Models/productOrderModel.js";
import { Link } from "react-router-dom";

function Dashboard() {

    // The Dashboard is the landing page of the application. It shows an overview of product statuses, including a list of low stock products and a list of recent product and customer orders.

    const [loading, setLoading] = useState(false)
    const [lowStockArray, setLowStockArray] = useState([])
    const [customerOrderArray, setCustomerOrderArray] = useState([])
    const [showCustomerOrder, setShowCustomerOrder] = useState(false)
    const [currentCustomerOrder, setCurrentCustomerOrder] = useState(new CustomerOrder(
        "0", "0", 0, [], Date()
    ))
    const [productOrderArray, setProductOrderArray] = useState([])
    const [showProductOrder, setShowProductOrder] = useState(false)
    const [currentProductOrder, setCurrentProductOrder] = useState(new ProductOrder(
        "0", "0", "0", [], Date()
    ))

    const fetchData = async () => {

        // set the page to loading
        setLoading(true)

        // get the data
        const res = await DatabaseService.ReadLowestStock()
        const res2 = await DatabaseService.ReadCustomerOrders()
        const res3 = await DatabaseService.ReadProductOrders()

        // stop loading
        setLoading(false)

        // set the data to the result
        setLowStockArray(res)
        setCustomerOrderArray(res2)
        setProductOrderArray(res3)
    }

    useEffect(() => {
        // run the fetch data function on load
        fetchData();
    }, [])

    const navigate = useNavigate();

    return(
        <center>
            <h1 id = "header">DASHBOARD</h1>
            { loading // conditional rendering for if page is loading
                ? <h3>LOADING</h3> // if loading is true
                : <div> 
                    <Link
                        key="linkToProductList"
                        to="/productList"
                    ><button id = "link"><h4 id = "button">Product List</h4></button></Link>
                    <br />
                    <Link
                        key="linkToProductOrder"
                        to="/productOrder"
                    ><button id = "link"><h4 id = "button">Product Order</h4></button></Link>
                    <h4>LOW STOCK </h4>
                    <table className="lowStockTable">
                        {lowStockArray.map((product) => ( // for each product in lowStockArray, render a button
                            <tbody key={product.productName}>
                                <tr>
                                    <td className="lowStockTableData">
                                        <center>
                                            <button id={product.productTypeID} className="lowStockButton" onClick={(event) => {
                                                // on click, push the productDetail page with the product data
                                                navigate('/productDetail', { state: { 
                                                    productTypeID: product.productTypeID,
                                                    productName: product.productName,
                                                    productCategoryID: product.productCategoryID,
                                                    price: product.price,
                                                    productArray: product.productArray,
                                                    productStockArray: product.productStockArray,
                                                    productImage: product.productImage,
                                                }});
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
                    <h4>RECENT CUSTOMER ORDERS</h4>
                    <table className="lowStockTable">
                        {customerOrderArray.map((order) => ( // for each customer order in customerOrderArray, render a button
                            <tbody key={order.orderNumber}>
                                <tr>
                                    <td className="lowStockTableData">
                                        <center>
                                            <button id={order.orderNumber} className="lowStockButton" onClick={(event) => {
                                                // on click, show the customer order data
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
                    { showCustomerOrder // if any customer order button has been clicked
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
                    <br />
                    <h4>RECENT PRODUCT ORDERS</h4>
                    <table className="lowStockTable">
                        {productOrderArray.map((order) => ( // for each product order in productOrderArray, render a button
                            <tbody key={order.orderNumber}>
                                <tr>
                                    <td className="lowStockTableData">
                                        <center>
                                            <button id={order.orderNumber} className="lowStockButton" onClick={(event) => {
                                                // on click, show the product order data
                                                setShowProductOrder(true)
                                                setCurrentProductOrder(order)
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
                    { showProductOrder // if any product order button has been clicked
                        ? <div>
                            Order Number: {currentProductOrder.orderNumber}
                            <br />
                            Product Name: {currentProductOrder.productName}
                            <br />
                            Product Type ID: {currentProductOrder.productTypeID}
                            <br />
                            Products: {currentProductOrder.productArray.toString()}
                            <br />
                            Time: {currentProductOrder.time.toDate().toDateString()}
                        </div>
                        : <div></div>
                    }
                    <br />
                </div>
            }
        </center>
    );
}

export default Dashboard;