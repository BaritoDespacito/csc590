import React from "react";
import '../Styling/productTypePreviewSmall.css'

function ProductTypePreviewSmall({product}) {

    // The ProductTypePreviewSmall is a subcomponent of the ProductOrderPage. It receives a product's data, then concisely displays the product's information, including its name and quantity in stock.
    // This is different to the ProductTypePreview because it is in a more concise form, used for more backend purposes. 

    return(
            <div className='fullBox'>
                <div>{product.productName}</div>
                <div>Quantity: {product.productStockArray.length}</div>
            </div>
    );
}

export default ProductTypePreviewSmall;