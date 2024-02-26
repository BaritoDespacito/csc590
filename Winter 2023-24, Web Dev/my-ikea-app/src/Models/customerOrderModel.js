class CustomerOrder {

    // The CustomerOrder model is used to receive and format customer order data stored in Firestore. It stores the order number, customer ID, price, list of products, and time of the order.

    constructor(orderNumber, customerID, price, productArray, time) {
        this.orderNumber = orderNumber;
        this.customerID = customerID;
        this.price = price;
        this.productArray = productArray;
        this.time = time;
    }

}

export default CustomerOrder;