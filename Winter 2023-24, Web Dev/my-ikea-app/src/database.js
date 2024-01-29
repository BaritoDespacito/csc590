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

// const testCollectionRef = db.collection('testCollection');
class DatabaseService {

  dbTestAdd = async (e) => {
    console.log('hi this is dbtestadd function')
    const data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };
    
    // Add a new document in collection "cities" with ID 'LA'
    const res = await db.collection('testCollection').doc('LA').set(data);
    console.log('data added')
  }

}
   
export default new DatabaseService();