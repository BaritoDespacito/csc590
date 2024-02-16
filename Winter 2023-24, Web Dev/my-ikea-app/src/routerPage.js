import React from "react";
import { Route, Routes } from 'react-router-dom';
import TestDBApp from "./Components/testDBApp";
import ProductTypeList from './Pages/productTypeList';
import ProductOrderPage from './Pages/productOrderPage';

function RouterPage() {
    return (
        <Routes>
            <Route path="/" exact element={<TestDBApp />} />
            <Route path="/productList" element={<ProductTypeList />} />
            <Route path="/productOrder" element={<ProductOrderPage />} />
        </Routes>
    )
}

export default RouterPage;