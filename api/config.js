const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyALCKq9ZV1E2otujx1Grow8CTMEXLHOt7w",
  authDomain: "managementapp-d13b1.firebaseapp.com",
  projectId: "managementapp-d13b1",
  storageBucket: "managementapp-d13b1.appspot.com",
  messagingSenderId: "472106151504",
  appId: "1:472106151504:web:8959ed5ffd7536b0866b55"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Product = db.collection("Products");
module.exports = Product;
