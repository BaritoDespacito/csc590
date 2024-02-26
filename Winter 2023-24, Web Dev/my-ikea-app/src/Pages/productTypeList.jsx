import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatabaseService from "../database.js";
import ProductTypePreview from "../Components/productTypePreview.jsx";

function ProductTypeList() {

    // ProductTypeList is the main search page of the system. Users are able to input a search query, as well as sort/filter their query for better results. Each result is displayed as a button which links to the ProductDetailPage.

    const [allProductTypes, setAllProductTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [categoryFilterValue, setCategoryFilterValue] = useState('-1');
    const [priceFilterValue, setPriceFilterValue] = useState('-1');
    const [stockFilterValue, setStockFilterValue] = useState('-1');
    const [sortValue, setSortValue] = useState('1');

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
        // fetch data on load
        fetchData();
    }, [])

    const handleKeyPress = async (event) => { // used to handle user inputs on search bar
        if(event.key === 'Enter'){ // if the user clicks enter
            setLoading(true) // set page to loading
            const res = await DatabaseService.ReadProductTypesWithQuery(event.target.value, categoryFilterValue, priceFilterValue, stockFilterValue, sortValue); // search for all products with query and sort/filter
            setLoading(false) // stop loading
            setAllProductTypes(res)
        }
    }

    const priceFilterOptions = [ // options for price filtering
        { label: "All", value: "-1" },
        { label: '< 50.00', value: "1" },
        { label: '50.00-100.00', value: '2' },
        { label: '100.00-200.00', value: '3' },
        { label: '>200.00', value: "4" },
    ];

    const stockFilterOptions = [ // options for stock filtering
        { label: "All", value: "-1" },
        { label: 'In Stock', value: "1" },
    ];

    const categoryFilterOptions = [ // options for category filtering
        { label: "All", value: "-1" },
        { label: 'Chair', value: "1" },
        { label: 'Table', value: '2' },
        { label: 'Light Feature', value: '3' },
        { label: 'Shelves', value: "4" },
        { label: 'Drawers', value: '5' },
    ];

    const sortOptions = [ // options for sorting
        { label: "Alphabetical", value: "1" },
        { label: 'Price Ascending', value: "2" },
        { label: 'Price Descending', value: "3" },
        { label: 'Category', value: '4' },
    ];

    const handleChangeCategory = (event) => { // used to handle changes on category filter
        setCategoryFilterValue(event.target.value);
    };

    const handleChangePrice = (event) => { // used to handle changes on price filter
        setPriceFilterValue(event.target.value);
    };

    const handleChangeStock = (event) => { // used to handle changes on stock filter
        setStockFilterValue(event.target.value);
    };

    const handleChangeSort = (event) => { // used to handle changes on sort
        setSortValue(event.target.value);
    };

    const navigate = useNavigate();

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
                        {categoryFilterOptions.map((option) => ( // for each category filter option, render an option
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Filter Price:
                    <select value={priceFilterValue} onChange={handleChangePrice}>
                        {priceFilterOptions.map((option) => ( // for each price filter option, render an option
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Filter Stock:
                    <select value={stockFilterValue} onChange={handleChangeStock}>
                        {stockFilterOptions.map((option) => ( // for each stock filter option, render an option
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Sort By:
                    <select value={sortValue} onChange={handleChangeSort}>
                        {sortOptions.map((option) => ( // for each sort option, render an option
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <br />
                { loading
                    ? <h2>LOADING</h2>
                    : <div>
                        { allProductTypes.length > 0 // if there are products found from query
                            ? <div>
                                {allProductTypes.map((product) => ( // for each product found, render a button
                                    <button id={product.productTypeID} onClick={() => {
                                        navigate('/productDetail', { state: { 
                                            // when button is clicked, push productDetail page with product info
                                            productTypeID: product.productTypeID,
                                            productName: product.productName,
                                            productCategoryID: product.productCategoryID,
                                            price: product.price,
                                            productArray: product.productArray,
                                            productStockArray: product.productStockArray,
                                            productImage: product.productImage,
                                        }});
                                    }}>
                                        <div key={product.productTypeID} >
                                            <ProductTypePreview
                                                product={product}
                                            ></ProductTypePreview>
                                            <br />
                                        </div>
                                    </button>
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