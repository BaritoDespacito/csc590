import React from "react";
import '../Styling/productTypePreviewSmall.css'

function ProductTypePreviewSmall({product, handler}) {
    return(
        <button id={product.productName} onClick={handler}>
            <div className='fullBox'>
                <div>{product.productName}</div>
                <div>Quantity: {product.productStockArray.length}</div>
            </div>
        </button>
    );
}

export default ProductTypePreviewSmall;