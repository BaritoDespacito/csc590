import React from "react";

function ProductTypePreview({product}) {
    return(
        <div>
            <div>this is a product type preview</div>
            <div>{product.productName}</div>
            <img src={product.productImage} alt="" />
        </div>
    );
}

export default ProductTypePreview;