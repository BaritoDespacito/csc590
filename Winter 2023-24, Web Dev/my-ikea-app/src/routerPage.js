import React from "react";
import { Route, Routes } from 'react-router-dom';
import TestDBApp from "./Components/testDBApp";
import ProductTypeList from './Pages/productTypeList';
import ProductOrderPage from './Pages/productOrderPage';
import ProductOrderSuccessPage from "./Pages/productOrderSuccessPage";
import InvPage from "./nikotestattempt/InvPage";
import DevPage from "./nikotestattempt/DevPage";

function RouterPage() {
    return (
        <Routes>
            <Route path="/" exact element={<TestDBApp />} />
            <Route path="/productList" element={<ProductTypeList />} />
            <Route path="/productOrder" element={<ProductOrderPage />} />
            <Route path="/productOrderSuccess" element={<ProductOrderSuccessPage />} />
            <Route path="/nikoattempt" element = {<InvPage />} />
            <Route path="/dev" element = {<DevPage />} />
        </Routes>
    )
}

export default RouterPage;