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
class DatabaseService {

  dbTestAdd = async (e) => {
    console.log('hi this is dbtestadd function')
    const data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };
    
    // Add a new document in collection "cities" with ID 'LA'
    const res = await addDoc(testCollectionRef, data)
    console.log('data added')
  }

  // dbTestAdd2 = () => {
  //   return addDoc(testCollectionRef, 'testing testing 1 2 1 2');
  // };

}
   
export default new DatabaseService();