import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCdPY7SM0WfyhX4rsuDKh05fKvFT3krL7M",
  authDomain: "facebook-messenger-clone-b51e9.firebaseapp.com",
  projectId: "facebook-messenger-clone-b51e9",
  storageBucket: "facebook-messenger-clone-b51e9.appspot.com",
  messagingSenderId: "728417062539",
  appId: "1:728417062539:web:6f1dfcc3b6417683ea4e8e",
  measurementId: "G-Y1SWE15XBT",
});

const db = firebaseApp.firestore()

export default db