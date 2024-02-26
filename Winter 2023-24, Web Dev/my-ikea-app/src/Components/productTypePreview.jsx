import React from "react";
import '../Styling/productTypePreview.css'

function ProductTypePreview({product}) {

    // The ProductTypePreview is a subcomponent of the ProductTypeList page. It receives a product's data, and displays a basic preview of the product, including its name, price, and image.

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