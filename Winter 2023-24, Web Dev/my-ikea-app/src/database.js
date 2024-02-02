import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {db} from './firebase.js';

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

  TestRead = async () => {
    console.log('hi this is testread function')
    const sampleDoc = doc(productCollectionRef, '0');
    const snapshot = await getDoc(sampleDoc);
    console.log(snapshot.data());
  }

}
   
export default new DatabaseService();