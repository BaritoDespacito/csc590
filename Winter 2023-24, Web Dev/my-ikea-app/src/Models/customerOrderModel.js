class CustomerOrder {

    constructor(orderNumber, customerID, price, productArray, time) {
        this.orderNumber = orderNumber;
        this.customerID = customerID;
        this.price = price;
        this.productArray = productArray;
        this.time = time;
    }

}

export default CustomerOrder;