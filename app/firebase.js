// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {addDoc, getDoc, getFirestore, query, setDoc, where, doc, onSnapshot, deleteDoc, orderBy} from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "zenmenu-71a7f.firebaseapp.com",
  projectId: "zenmenu-71a7f",
  storageBucket: "zenmenu-71a7f.appspot.com",
  messagingSenderId: "246725129317",
  appId: "1:246725129317:web:9380129b8cc1d72722428c",
  measurementId: "G-8Y7TXP2F63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getAllItemsInCategory(category) {
    const q = query(collection(db, 'Items'), where('Category', '==', category));
    const snapShot = await getDocs(q);
    return snapShot.docs.map(doc => {return doc.data()});
}
export async function getCategories(){
    const snapShot = await getDocs(query(collection(db,'Categories'), orderBy('index')));
    return snapShot.docs.map(doc => {return doc.id});
}
export async function getAdditions(item){
    if(!item.Additions) return;
    const q = query(collection(db, 'Additions'), where('Name', 'in', item.Additions));
    const snapShot = await getDocs(q);
    return snapShot.docs.map(doc => {return doc.data()})
}
export async function addOrder(order){
    const docRef = doc(db, 'Orders', String(order.table));
    return setDoc(docRef, {order: order.items});
}

export function closeOrder(table)
{
    const docRef = doc(db, 'Orders', String(table))
    deleteDoc(docRef);
}
