import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyDzbRNUp8FFrzPE4sdfr1lFohKjk568yVg",
  authDomain: "facebook-messager-clone-12c45.firebaseapp.com",
  projectId: "facebook-messager-clone-12c45",
  storageBucket: "facebook-messager-clone-12c45.appspot.com",
  messagingSenderId: "159121772359",
  appId: "1:159121772359:web:4595ccab42ea272b54c662",
  measurementId: "G-ZCDFDJQS1K",
});

const db = firebaseApp.firestore();

export default db;
