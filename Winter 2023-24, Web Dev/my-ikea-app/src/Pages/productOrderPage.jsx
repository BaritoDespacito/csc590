import React, { useEffect, useState } from "react";
import ProductTypePreviewSmall from "../Components/productTypePreviewSmall";
import DatabaseService from "../database.js";

function ProductOrderPage() {
    const [allProductTypes, setAllProductTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState("NONE")

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
        fetchData();
    }, [])

    const handleKeyPress = async (event) => {
        if(event.key === 'Enter'){
            console.log('enter pressed, sending search query of', event.target.value)
            setLoading(true)
            const res = await DatabaseService.ReadProductTypesWithQuery(event.target.value, '-1', '-1', '-1', '-1');
            console.log('result from search', res)
            setLoading(false)
            setAllProductTypes(res)
        }
    }

    const handleProductSelect = (event) => {
        console.log('parent', event.target);
        console.log('parent', event.target.id);
        setSelectedProduct('button has been hit');
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
                        { allProductTypes.length > 0
                            ? <div>
                                {allProductTypes.map((product) => (
                                    <button key={product.productID} onClick={() => {
                                        console.log('hello', product.productName)
                                        setSelectedProduct(product.productName)
                                    }}>
                                        <ProductTypePreviewSmall
                                            product={product}
                                        ></ProductTypePreviewSmall>
                                        <br />
                                    </button>
                                ))}
                                Selected: {selectedProduct}
                            </div>
                           : <h2>NO PRODUCTS FOUND</h2>
                        }
                    </div>
                }
            </center>
        </div>
    );
}

export default ProductOrderPage;