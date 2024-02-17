class ProductType {

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