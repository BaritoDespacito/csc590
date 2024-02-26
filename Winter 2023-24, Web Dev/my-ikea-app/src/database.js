import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import {db} from './firebase.js';
import ProductType from "./Models/productTypeModel.js"
import CustomerOrder from './Models/customerOrderModel.js'
import ProductOrder from './Models/productOrderModel.js'

// Collection references, used to reference each collection in Firestore
const testCollectionRef = collection(db, "testCollection");
const productCollectionRef = collection(db, "productCollection");
const productTypeCollectionRef = collection(db, "productTypeCollection");
const productOrdersCollectionRef = collection(db, "productOrdersCollection");
const customerOrdersCollectionRef = collection(db, "customerOrdersCollection");
class DatabaseService {

  // The DatabaseService class is the entire backend service of the system. The class contains all database functions required in the system. An instance of the class can be initialized in any page in order to access all available functions.

  TestAdd = async () => {

    // TestAdd was created to test the database's write function. TestAdd is not used in the final product.

    console.log('hi this is testadd function')
    const data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };
    
    // Add a new document in collection "testCollection" with data and random ID
    const res = await addDoc(testCollectionRef, data)
    console.log('data added')

    return res;
  }

  TestReadProductType = async () => {

    // TestReadProductType was created to test the database's read function. TestReadProductType is not used in the final product.

    const sampleDoc = doc(productTypeCollectionRef, '1'); // create reference of document
    const snapshot = await getDoc(sampleDoc); // get data from firestore
    const res = new ProductType( // format data from snapshot into ProductType model
      snapshot.data().productTypeID,
      snapshot.data().productName,
      snapshot.data().productCategoryID,
      snapshot.data().price,
      snapshot.data().productArray,
      snapshot.data().productStockArray,
      snapshot.data().productImage,
    );
    return res;
  }

  ReadSpecificProductType = async (productID) => {

    // ReadSpecificProductType was created for an earlier iteration of the productDetailPage. It was used to read all product details of an inputted product type ID. ReadSpecificProductType is not used in the final product.

    const typeDoc = doc(productTypeCollectionRef, productID); // create reference of document
    const snapshot = await getDoc(typeDoc); // get data from firestore
    const res = new ProductType( // format data from snapshot into ProductType model
      snapshot.data().productTypeID,
      snapshot.data().productName,
      snapshot.data().productCategoryID,
      snapshot.data().price,
      snapshot.data().productArray,
      snapshot.data().productStockArray,
      snapshot.data().productImage,
    );
    return res;
  }

  ReadAllProductTypes = async () => {

    // ReadAllProducTypes is used to read all product types stored in Firestore. It returns an array of ProductType instances.

    const snapshot = await getDocs(productTypeCollectionRef); // get all data from firestore
    const res = [];
    snapshot.forEach(doc => { // for each document included in the snapshot
      res.push(new ProductType( // format data from snapshot into ProductType model, and add to res
        doc.data().productTypeID,
        doc.data().productName,
        doc.data().productCategoryID,
        doc.data().price,
        doc.data().productArray,
        doc.data().productStockArray,
        doc.data().productImage,
      ))
    });
    return res.sort((productA, productB) => { // return a sorted version of res
      if (productA.productName < productB.productName) { // if productA is alphabetically behind productB
        return -1; // put it behind
      } else if (productA.productName > productB.productName) { // vice versa
        return 1;
      } else {
        return 0; // if they are alphabetically the same
      }
    });
  }

  ReadProductTypesWithQuery = async (searchQuery, categoryFilter, priceFilter, stockFilter, sortBy) => {

    // ReadProductTypesWithQuery is an inbuilt search algorithm used to search through all product types with a query and sort/filters.

    let res = [];
    let allProducts = await this.ReadAllProductTypes(); // use ReadAllProductTypes to get list of all products

    for (let product of allProducts) { // for each product
      if (!product.productName.includes(searchQuery.toUpperCase())) { // if the search query is not included in product name
        continue // continue, which skips the current product and moves to next for loop iteration
      } 
      if (categoryFilter != "-1" && categoryFilter != product.productCategoryID) { // if there is a category filter and the filter does not meet the product's category
        continue // continue, which skips the current product and moves to next for loop iteration
      }
      if (stockFilter != "-1" && product.productArray.length == 0) { // if there is a stock filter and the product is out of stock
        continue // continue, which skips the current product and moves to next for loop iteration
      }
      if (priceFilter != "-1") { // if there is a price filter
        if (priceFilter == "1" && product.price >= 50.00) { // if the price does not meet filter 
          continue // continue, which skips the current product and moves to next for loop iteration
        }
        else if (priceFilter == "2" && (product.price < 50.00 || product.price > 100.00)) { // if the price does not meet filter 
          continue // continue, which skips the current product and moves to next for loop iteration
        }
        else if (priceFilter == "3" && (product.price < 100.00 || product.price > 200.00)) { // if the price does not meet filter 
          continue // continue, which skips the current product and moves to next for loop iteration
        }
        else if (priceFilter == "4" && product.price <= 200.00) { // if the price does not meet filter 
          continue // continue, which skips the current product and moves to next for loop iteration
        }
      }
      res.push(product); // if the search has not continued, the product passes all queries/filters, so the product can be included in final result
    }

    return res.sort((productA, productB) => { // return a sorted version of res
      if (sortBy == "1") { // if the sort is alphabetical
        if (productA.productName < productB.productName) {
          return -1;
        } else if (productA.productName > productB.productName) {
          return 1;
        } else {
          return 0;
        }
      } else if (sortBy == "2") { // if the sort is by price ascending
        if (productA.price < productB.price) {
          return -1;
        } else if (productA.price > productB.price) {
          return 1;
        } else {
          return 0;
        }
      } else if (sortBy == "3") { // if the sort is by price descending
        if (productA.price > productB.price) {
          return -1;
        } else if (productA.price < productB.price) {
          return 1;
        } else {
          return 0;
        }
      } else { // if the sort is by category
        if (productA.productCategoryID < productB.productCategoryID) {
          return -1;
        } else if (productA.productCategoryID > productB.productCategoryID) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  CreateProductOrder = async (quantity, productTypeID) => {

    // CreateProductOrder is used to fetch all data required to make a product order, then create all necessary documents associated with that order. It will create the order document and new product documents, and update the product type document accordingly.

    // search for the product type's document
    const productTypeDocument = doc(productTypeCollectionRef, productTypeID);
    const productSnapshot = await getDoc(productTypeDocument);
    const productType = new ProductType(
      productSnapshot.data().productTypeID,
      productSnapshot.data().productName,
      productSnapshot.data().productCategoryID,
      productSnapshot.data().price,
      productSnapshot.data().productArray,
      productSnapshot.data().productStockArray,
      productSnapshot.data().productImage,
    );


    // get the current highest id
    const idInfo = doc(productCollectionRef, 'collectionInfo');
    const infoSnapshot = await getDoc(idInfo);
    const highestID = parseInt(infoSnapshot.data().highestID);

    // create products for productCollection
    let productIDs = [];
    let productData = {
      productCategoryID: productType.productCategoryID,
      productID: 0,
      productName: productType.productName,
      productTypeID: productTypeID,
      sold: false,
    };
    for (let i = 1; i<= quantity; i++) {
      productIDs.push((highestID+i).toString())
      productData.productID = (highestID+i).toString()
      const res = await setDoc(doc(productCollectionRef, (highestID+i).toString()), productData)
      const res2 = await updateDoc(doc(productCollectionRef, 'collectionInfo'), {
        highestID: (highestID+i).toString()
      })
    }

    // update productType doc with new ids (product array and product stock array)
    const res1 = await updateDoc(doc(productTypeCollectionRef, productTypeID), {
      productArray: [...productType.productArray, ...productIDs],
      productStockArray: [...productType.productStockArray, ...productIDs],
    })

    // create productOrder doc
    const ordersInfo = doc(productOrdersCollectionRef, 'collectionInfo')
    const orderInfoSnapshot = await getDoc(ordersInfo)
    const newOrderID = parseInt(orderInfoSnapshot.data().highestID)
    const orderData = {
      orderNumber: newOrderID+1,
      productArray: productIDs,
      productName: productType.productName,
      productTypeID: productTypeID,
      time: serverTimestamp(),
    };
    const res4 = await setDoc(doc(productOrdersCollectionRef, (newOrderID+1).toString()), orderData)

    // set new orders collection highest
    const res5 = await updateDoc(doc(productOrdersCollectionRef, 'collectionInfo'), {
      highestID: (newOrderID+1).toString()
    })
  }

  ReadLastProductOrder = async () => {

    // ReadLastProductOrder is used to read the product order just created on the ProductOrderSuccess page.

    const collectionInfo = await getDoc(doc(productOrdersCollectionRef, 'collectionInfo')); 
    const lastID = collectionInfo.data().highestID;
    
    const lastOrder = await getDoc(doc(productOrdersCollectionRef, lastID))
    const productName = lastOrder.data().productName;
    const quantity = lastOrder.data().productArray.length;

    return [productName, quantity];
  }

  ReadLowestStock = async () => {

    // ReadLowestStock is used on the dashboard to get the products of lowest stock.

    let products = await this.ReadAllProductTypes() // get all products
    products.sort((a, b) => { // sort products by stock
      if (a.productStockArray.length > b.productStockArray.length) {
        return 1
      } else if (a.productStockArray.length < b.productStockArray.length) {
        return -1
      } else {
        return 0
      }
    })
    return products.slice(0, 3) // return the three lowest stock products
  }

  ReadCustomerOrders = async () => {

    // ReadCustomerOrders is used on the dashboard to get the most recent customer orders.

    const orderSnapshot = await getDocs(customerOrdersCollectionRef) // get all orders
    let orders = []
    orderSnapshot.forEach(doc => { // format each order into CustomerOrder model
      if (!doc.data().highestID) {
        orders.push(new CustomerOrder(
          doc.data().orderNumber,
          doc.data().customerID,
          doc.data().price,
          doc.data().productArray,
          doc.data().time,
        ))
      }
    })
    orders.sort((a, b) => { // sort orders by date
      if (a.time.toDate() < b.time.toDate()) {
        return 1
      } else if (a.time.toDate() > b.time.toDate()) {
        return -1
      } else {
        return 0
      }
    })
    return orders.slice(0, 3) // return the three most recent orders
  }

  ReadProductOrders = async () => {

    // ReadProductOrders is used on the dashboard to get the most recent product orders.

    const orderSnapshot = await getDocs(productOrdersCollectionRef) // get all product orders
    let orders = []
    orderSnapshot.forEach(doc => { // format each order into ProductOrder model
      if (!doc.data().highestID) {
        orders.push(new ProductOrder(
          doc.data().orderNumber,
          doc.data().productName,
          doc.data().productTypeID,
          doc.data().productArray,
          doc.data().time,
        ))
      }
    })
    orders.sort((a, b) => { // sort orders by date
      if (a.time.toDate() < b.time.toDate()) {
        return 1
      } else if (a.time.toDate() > b.time.toDate()) {
        return -1
      } else {
        return 0
      }
    })
    return orders.slice(0, 3) // return the three most recent orders
  }

}
   
export default new DatabaseService();