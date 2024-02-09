import React from "react";
import '../Styling/productTypePreview.css'

function ProductTypePreview({product}) {
    return(
        <div>
            <div>this is a product type preview</div>
            <div>{product.productName}</div>
            <img src={product.productImage} alt="" className="productTypePreviewImage"/>
        </div>
    );
}

export default ProductTypePreview;