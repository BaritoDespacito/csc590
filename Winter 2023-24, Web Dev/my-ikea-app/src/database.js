import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
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
}
   
export default new DatabaseService();