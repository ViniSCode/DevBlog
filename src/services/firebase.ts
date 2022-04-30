
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDwtSOzaBa94kAlArR5qjZccHag72izpzM",
  authDomain: "devblog-fe7e4.firebaseapp.com",
  databaseURL: "https://devblog-fe7e4-default-rtdb.firebaseio.com",
  projectId: "devblog-fe7e4",
  storageBucket: "devblog-fe7e4.appspot.com",
  messagingSenderId: "1009974561028",
  appId: "1:1009974561028:web:1f993ce6fb886c56ee2851"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { auth, database, firebase };

