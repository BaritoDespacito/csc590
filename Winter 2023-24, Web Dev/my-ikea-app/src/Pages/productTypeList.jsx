import React, { useEffect, useState } from "react";
import DatabaseService from "../database.js";
import ProductTypePreview from "../Components/productTypePreview.jsx";

function ProductTypeList() {
    const [allProductTypes, setAllProductTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [categoryFilterValue, setCategoryFilterValue] = useState('-1');
    const [priceFilterValue, setPriceFilterValue] = useState('-1');
    const [stockFilterValue, setStockFilterValue] = useState('-1');
    const [sortValue, setSortValue] = useState('1');

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
            console.log(categoryFilterValue);
            setLoading(true)
            const res = await DatabaseService.ReadProductTypesWithQuery(event.target.value, categoryFilterValue, priceFilterValue, stockFilterValue, sortValue);
            console.log('result from search', res)
            setLoading(false)
            setAllProductTypes(res)
        }
    }

    const priceFilterOptions = [
        { label: "All", value: "-1" },
        { label: '< 50.00', value: "1" },
        { label: '50.00-100.00', value: '2' },
        { label: '100.00-200.00', value: '3' },
        { label: '>200.00', value: "4" },
    ];

    const stockFilterOptions = [
        { label: "All", value: "-1" },
        { label: 'In Stock', value: "1" },
    ];

    const categoryFilterOptions = [
        { label: "All", value: "-1" },
        { label: 'Chair', value: "1" },
        { label: 'Table', value: '2' },
        { label: 'Light Feature', value: '3' },
        { label: 'Shelves', value: "4" },
        { label: 'Drawers', value: '5' },
    ];

    const sortOptions = [
        { label: "Alphabetical", value: "1" },
        { label: 'Price Ascending', value: "2" },
        { label: 'Price Descending', value: "3" },
        { label: 'Category', value: '4' },
    ];

    const handleChangeCategory = (event) => {
        setCategoryFilterValue(event.target.value);
    };

    const handleChangePrice = (event) => {
        setPriceFilterValue(event.target.value);
    };

    const handleChangeStock = (event) => {
        setStockFilterValue(event.target.value);
    };

    const handleChangeSort = (event) => {
        setSortValue(event.target.value);
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
                    Filter Category:
                    <select value={categoryFilterValue} onChange={handleChangeCategory}>
                        {categoryFilterOptions.map((option) => (
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Filter Price:
                    <select value={priceFilterValue} onChange={handleChangePrice}>
                        {priceFilterOptions.map((option) => (
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Filter Stock:
                    <select value={stockFilterValue} onChange={handleChangeStock}>
                        {stockFilterOptions.map((option) => (
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Sort By:
                    <select value={sortValue} onChange={handleChangeSort}>
                        {sortOptions.map((option) => (
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