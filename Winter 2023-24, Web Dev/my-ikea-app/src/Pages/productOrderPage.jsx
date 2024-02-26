import React, { useEffect, useState } from "react";
import ProductTypePreviewSmall from "../Components/productTypePreviewSmall";
import { useNavigate } from 'react-router-dom';
import DatabaseService from "../database.js";

function ProductOrderPage() {

    // ProductOrderPage is a page used to show all products and their quantities. Each product can be selected and an order request can be made to increase warehouse stock.

    const [allProductTypes, setAllProductTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState("NONE")
    const [selectedProductID, setSelectedProductID] = useState("-1")
    const [quantity, setQuantity] = useState(0)

    const navigate = useNavigate();

    const fetchData = async () => {
        // set the page to loading
        setLoading(true)

        // get the data
        const resAllDocs = await DatabaseService.ReadAllProductTypes()

        // stop loading
        setLoading(false)

        // set the data to the result
        setAllProductTypes(resAllDocs)
    }

    useEffect(() => {
        // fetch the data on load
        fetchData();
    }, [])

    const handleKeyPress = async (event) => { // used to handle button inputs for search bar
        if(event.key === 'Enter'){ // if user has clicked enter
            setLoading(true) // set the page to loading
            const res = await DatabaseService.ReadProductTypesWithQuery(event.target.value, '-1', '-1', '-1', '-1'); // fetch product types with name and no sort/filter
            setLoading(false) // stop loading
            setAllProductTypes(res)
        }
    }

    const createProductOrder = async () => { // used to handle input of order button
        if (selectedProduct == "NONE") { // if there isn't a selected product
            console.log('select smth bozo')
        } else if (quantity <= 0) { // if the quantity of product isn't selected or is invalid
            console.log('put a quantity bozo')
        } else {
            await DatabaseService.CreateProductOrder(quantity, selectedProductID) // create the product order
            navigate('/productOrderSuccess') // push the product order success page 
        }
    }

    return(
        <div>
            <center>
                <h1>ORDER PRODUCTS</h1>
                <input 
                    type="text"
                    onKeyDown={handleKeyPress}
                />
                { loading
                    ? <h2>LOADING</h2>
                    : <div>
                        { allProductTypes.length > 0 // if there are products from the search query to be displayed
                            ? <div>
                                {allProductTypes.map((product) => ( // for each product found, create a button
                                    <div key={product.productName}>
                                        <button key={product.productName} onClick={() => {
                                            setSelectedProduct(product.productName) // if the button is clicked, set the current selected product to that
                                            setSelectedProductID(product.productTypeID);
                                        }}>
                                            <ProductTypePreviewSmall
                                                product={product}
                                            ></ProductTypePreviewSmall>
                                        </button>
                                        <br />
                                    </div>
                                ))}
                                Selected: {selectedProduct}
                                <br />
                                <label>Quantity: <input type="number" id="quantityInput" onChange={(event) => {
                                    if (!event.target.value) { // if the user enters no value
                                        setQuantity(0)
                                    } else {
                                        setQuantity(event.target.value)
                                    }
                                }}/></label>
                                <br />
                                <button onClick={createProductOrder}>ORDER</button>
                            </div>
                           : <h2>NO PRODUCTS FOUND</h2> // if no products from search query are found
                        }
                    </div>
                }
            </center>
        </div>
    );
}

export default ProductOrderPage;