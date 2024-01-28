import { collection, addDoc } from "firebase/firestore";
import {db} from './firebase.js';
   
    const dbTestAdd = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "testing"), {
              testData: "testData",    
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }