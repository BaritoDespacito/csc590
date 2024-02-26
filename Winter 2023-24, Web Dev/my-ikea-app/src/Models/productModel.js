class Product {

    // The Product model is used to receive and format product data stored in Firestore. It stores the ID, name, type, category, and status of sale of a SPECIFIC product.
    // This is used to store the data of one specific product, like a specific table stored in warehouse.

    constructor(id, productName, type, category, sold) {
        this.id = id;
        this.productName = productName;
        this.type = type;
        this.category = category;
        this.sold = sold;
    }
    
}

export default Product;