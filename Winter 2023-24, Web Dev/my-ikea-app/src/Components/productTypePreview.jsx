import React from "react";
import '../Styling/productTypePreview.css'
import ProductType from "../Models/productTypeModel";

function ProductTypePreview({product}) {
    return(
        <div>
            <div>this is a product type preview</div>
            <div>{product.productName}</div>
            <div>{product.price}</div>
            <img src={product.productImage} alt="" className="productTypePreviewImage"/>
        </div>
    );
}

export default ProductTypePreview;