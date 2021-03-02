import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAAAeaT5j6OAIKXB1j1VOmQ7KVhwk-9skQ",
  authDomain: "sidan-917f9.firebaseapp.com",
  databaseURL: "https://sidan-917f9-default-rtdb.firebaseio.com",
  projectId: "sidan-917f9",
  storageBucket: "sidan-917f9.appspot.com",
  messagingSenderId: "834184849334",
  appId: "1:834184849334:web:47150f2fde51245552c317",
  measurementId: "G-QGRHMGH4KD"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const agentsCollection = db.collection('agents')
const customersCollection = db.collection('customers')
const ordersCollection = db.collection('orders')
const servicesCollection = db.collection('services')
const serviceTypesCollection = db.collection('service_type')
const itemsCollection = db.collection('items')

// export utils/refs
export {
  db,
  auth,
  agentsCollection,
  usersCollection,
  ordersCollection,
  customersCollection,
  servicesCollection,
  serviceTypesCollection,
  itemsCollection
}
