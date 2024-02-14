import React, { useEffect, useState } from "react";
import DatabaseService from "../database.js";
import ProductTypePreview from "../Components/productTypePreview.jsx";

function ProductTypeList() {
    const [allProductTypes, setAllProductTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterValue, setFilterValue] = useState('-1');

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
            console.log(filterValue);
            setLoading(true)
            const res = await DatabaseService.ReadProductTypesWithQuery(event.target.value, filterValue)
            console.log('result from search', res)
            setLoading(false)
            setAllProductTypes(res)
        }
    }

    const filterOptions = [
        { label: "No Filter", value: "-1" },
        { label: 'Chair', value: "1" },
        { label: 'Table', value: '2' },
        { label: 'Light Feature', value: '3' },
        { label: 'Shelves', value: "4" },
        { label: 'Drawers', value: '5' },
    ];

    const handleChange = (event) => {
        setFilterValue(event.target.value);
    };

    return(
        <div>
            <center>
                <h1>PRODUCTS</h1>
                <input 
                    type="text"
                    onKeyDown={handleKeyPress}
                />
                <br />
                <label>
                    Filter:
                    <select value={filterValue} onChange={handleChange}>
                        {filterOptions.map((option) => (
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                { loading
                    ? <h2>LOADING</h2>
                    : <div>
                        { allProductTypes.length > 0
                            ? <div>
                                {allProductTypes.map((product) => (
                                    <div key={product.productID}>
                                        <ProductTypePreview
                                            product={product}
                                        ></ProductTypePreview>
                                        <br />
                                    </div>
                                ))}
                            </div>
                           : <h2>NO PRODUCTS FOUND</h2>
                        }
                    </div>
                }
            </center>
        </div>
    );
}

export default ProductTypeList;