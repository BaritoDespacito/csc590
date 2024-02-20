import React from "react";

function ProductOrderSuccessPage({route, navigation}) {
    const { productName, quantity } = route.params;
    
    return(
        <center>
            <h1>PRODUCTS ORDERED SUCCESSFULLY</h1>
            <br />
            <h3>{productName}, {quantity}</h3>
        </center>
    );
}

export default ProductOrderSuccessPage;