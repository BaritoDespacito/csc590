import React, { useState, useEffect } from "react";
import ProductType from "../Models/productTypeModel";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styling/productDetailPage.css"

function ProductDetailPage() {

    // ProductDetailPage is a page used to show detailed information about each product. It takes in the product's data and displays all information available.

    const {state} = useLocation();
    const { productTypeID, productName, productCategoryID, price, productArray, productStockArray, productImage } = state; // read values passed through state

    return(
        <div>
            <center>
                <h1>{productName}</h1>
                <img src={productImage} alt="" />
                <h3>Price: {price}</h3>
                <h3>IN STOCK: {productStockArray.length}</h3>
                <table className="productStockTable">
                    {productStockArray.map((product) => ( // for each product in productStockArray, render a row
                        <tbody>
                            <tr>
                                <td>
                                    <center>
                                        {product}
                                    </center>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                <h3>SOLD: {productArray.length-productStockArray.length}</h3> 
                <Link
                    key="linkToProductOrder"
                    to="/productOrder"
                >Product Order</Link>
            </center>
        </div>
    );
}

export default ProductDetailPage;