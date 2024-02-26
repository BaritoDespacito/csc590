class ProductOrder {

    // The ProductOrder model is used to receive and format product order data stored in Firestore. It stores the order number, name of product, product type ID, list of products, and time of the order.

    constructor(orderNumber, productName, productTypeID, productArray, time) {
        this.orderNumber = orderNumber;
        this.productName = productName;
        this.productTypeID = productTypeID;
        this.productArray = productArray;
        this.time = time;
    }

}

export default ProductOrder;