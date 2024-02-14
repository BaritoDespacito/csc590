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
    return res;
  }

  ReadProductTypesWithQuery = async (searchQuery, filterBy) => {
    let res = [];
    let allProducts = await this.ReadAllProductTypes();
    allProducts.forEach(product => {
      if (filterBy == "-1") {
        if (product.productName.includes(searchQuery.toUpperCase())) {
          res.push(product);
        }
      } else {
        if (product.productName.includes(searchQuery.toUpperCase()) && product.productCategoryID == filterBy)  {
          res.push(product);
        }
      }
    });
    return res
  }
}
   
export default new DatabaseService();