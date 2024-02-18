import React from "react";
import '../Styling/productTypePreviewSmall.css'

function ProductTypePreviewSmall({product, handler}) {

    // const onTrigger = (event) => {
    //     // Call the parent callback function
    //     console.log('child', event.target.id);
    //     handler(
    //         event
    //     );
    // };

    return(
        // <button id={product.productName} onClick={onTrigger}>
            <div className='fullBox'>
                <div>{product.productName}</div>
                <div>Quantity: {product.productStockArray.length}</div>
            </div>
        // </button>
    );
}

export default ProductTypePreviewSmall;