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

const testCollectionRef = collection(db, "testCollection");
const productCollectionRef = collection(db, "productCollection");
const productTypeCollectionRef = collection(db, "productTypeCollection");
const productOrdersCollectionRef = collection(db, "productOrdersCollection");
const customerOrdersCollectionRef = collection(db, "customerOrdersCollection");
class DatabaseService {

  TestAdd = async () => {
    console.log('hi this is testadd function')
    const data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };
    
    // Add a new document in collection "cities" with ID 'LA'
    const res = await addDoc(testCollectionRef, data)
    console.log('data added')

    return res;
  }

  TestReadProductType = async () => {
    console.log('hi this is testread function')
    const sampleDoc = doc(productTypeCollectionRef, '1');
    const snapshot = await getDoc(sampleDoc);
    console.log(snapshot.data());
    const res = new ProductType(
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
    const typeDoc = doc(productTypeCollectionRef, productID);
    const snapshot = await getDoc(typeDoc);
    console.log(snapshot.data());
    const res = new ProductType(
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
    const snapshot = await getDocs(productTypeCollectionRef);
    const res = [];
    snapshot.forEach(doc => {
      res.push(new ProductType(
        doc.data().productTypeID,
        doc.data().productName,
        doc.data().productCategoryID,
        doc.data().price,
        doc.data().productArray,
        doc.data().productStockArray,
        doc.data().productImage,
      ))
    });
    return res.sort((productA, productB) => {
      if (productA.productName < productB.productName) {
        return -1;
      } else if (productA.productName > productB.productName) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  ReadProductTypesWithQuery = async (searchQuery, categoryFilter, priceFilter, stockFilter, sortBy) => {
    let res = [];
    let allProducts = await this.ReadAllProductTypes();

    for (let product of allProducts) {
      console.log(product.price);
      if (!product.productName.includes(searchQuery.toUpperCase())) {
        continue
      }
      if (categoryFilter != "-1" && categoryFilter != product.productCategoryID) {
        continue
      }
      if (stockFilter != "-1" && product.productArray.length == 0) {
        continue
      }
      if (priceFilter != "-1") {
        if (priceFilter == "1" && product.price >= 50.00) {
          console.log('continuing');
          continue
        }
        else if (priceFilter == "2" && (product.price < 50.00 || product.price > 100.00)) {
          continue
        }
        else if (priceFilter == "3" && (product.price < 100.00 || product.price > 200.00)) {
          continue
        }
        else if (priceFilter == "4" && product.price <= 200.00) {
          continue
        }
      }
      res.push(product);
    }

    return res.sort((productA, productB) => {
      if (sortBy == "1") {
        if (productA.productName < productB.productName) {
          return -1;
        } else if (productA.productName > productB.productName) {
          return 1;
        } else {
          return 0;
        }
      } else if (sortBy == "2") {
        if (productA.price < productB.price) {
          return -1;
        } else if (productA.price > productB.price) {
          return 1;
        } else {
          return 0;
        }
      } else if (sortBy == "3") {
        if (productA.price > productB.price) {
          return -1;
        } else if (productA.price < productB.price) {
          return 1;
        } else {
          return 0;
        }
      } else {
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
    console.log('got product type data')

    // get the current highest id
    const idInfo = doc(productCollectionRef, 'collectionInfo');
    const infoSnapshot = await getDoc(idInfo);
    const highestID = parseInt(infoSnapshot.data().highestID);
    console.log('got highest id', highestID.toString())

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
      console.log(highestID+i);
      productIDs.push((highestID+i).toString())
      productData.productID = (highestID+i).toString()
      const res = await setDoc(doc(productCollectionRef, (highestID+i).toString()), productData)
      const res2 = await updateDoc(doc(productCollectionRef, 'collectionInfo'), {
        highestID: (highestID+i).toString()
      })
    }
    console.log('created product doc')

    // update productType doc with new ids (product array and product stock array)
    const res1 = await updateDoc(doc(productTypeCollectionRef, productTypeID), {
      productArray: [...productType.productArray, ...productIDs],
      productStockArray: [...productType.productStockArray, ...productIDs],
    })

    // create productOrder doc
    const orderData = {
      productArray: productIDs,
      productName: productType.productName,
      productTypeID: productTypeID,
      time: serverTimestamp(),
    };
    console.log('order data created')
    const ordersInfo = doc(productOrdersCollectionRef, 'collectionInfo')
    const orderInfoSnapshot = await getDoc(ordersInfo)
    const newOrderID = parseInt(orderInfoSnapshot.data().highestID)
    console.log('got new order id', newOrderID+1)
    const res4 = await setDoc(doc(productOrdersCollectionRef, (newOrderID+1).toString()), orderData)
    console.log('made product order')

    // set new orders collection highest
    const res5 = await updateDoc(doc(productOrdersCollectionRef, 'collectionInfo'), {
      highestID: (newOrderID+1).toString()
    })
  }

  ReadLastProductOrder = async () => {
    const collectionInfo = await getDoc(doc(productOrdersCollectionRef, 'collectionInfo'));
    const lastID = collectionInfo.data().highestID;
    
    const lastOrder = await getDoc(doc(productOrdersCollectionRef, lastID))
    const productName = lastOrder.data().productName;
    const quantity = lastOrder.data().productArray.length;

    return [productName, quantity];
  }

  ReadLowestStock = async () => {
    const productSnapshot = await getDocs(productTypeCollectionRef)
    let products = []
    productSnapshot.forEach(doc => {
      // console.log(doc.data())
      products.push(new ProductType(
        doc.data().productTypeID,
        doc.data().productName,
        doc.data().productCategoryID,
        doc.data().price,
        doc.data().productArray,
        doc.data().productStockArray,
        doc.data().productImage,
      ))
    })
    products.sort((a, b) => {
      if (a.productStockArray.length > b.productStockArray.length) {
        return 1
      } else if (a.productStockArray.length < b.productStockArray.length) {
        return -1
      } else {
        return 0
      }
    })
    return products.slice(0, 3)
  }

}
   
export default new DatabaseService();