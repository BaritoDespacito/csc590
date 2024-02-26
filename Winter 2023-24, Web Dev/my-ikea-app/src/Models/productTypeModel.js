class ProductType {

    // The ProductType model is used to receive and format product type data stored in Firestore. It stores the product type ID, name, category ID, price, list of products created, list of products in warehouse, and image of a product type.
    // This is used to store the data of a product type, like a certain type of table that IKEA makes.

    constructor(productTypeID, productName, productCategoryID, price, productArray, productStockArray, productImage) {
        this.productTypeID = productTypeID;
        this.productName = productName;
        this.productCategoryID = productCategoryID;
        this.price = price;
        this.productArray = productArray;
        this.productStockArray = productStockArray;
        this.productImage = productImage;
    }
}

export default ProductType;