import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ProductDetailPage() {

    const {state} = useLocation();
    const { productTypeID } = state; // Read values passed on state

    return(
        <div>
            hello
            {productTypeID}
        </div>
    );
}

export default ProductDetailPage;