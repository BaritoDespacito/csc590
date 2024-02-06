import React from "react";
import { Route, Routes } from 'react-router-dom';
import TestDBApp from "./Components/testDBApp";
import ProductList from './Pages/productList';

function RouterPage() {
    return (
        <Routes>
            <Route path="/" exact element={<TestDBApp />} />
            <Route path="/productList" element={<ProductList />} />
        </Routes>
    )
}

export default RouterPage;