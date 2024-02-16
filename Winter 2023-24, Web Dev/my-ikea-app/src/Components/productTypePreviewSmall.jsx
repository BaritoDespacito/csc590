import React from "react";
import '../Styling/productTypePreviewSmall.css'

function ProductTypePreviewSmall({product}) {
    return(
        <div className='fullBox'>
            <div>{product.productName}</div>
        </div>
    );
}

export default ProductTypePreviewSmall;