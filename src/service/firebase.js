import firebase from 'firebase/compat/app';
import 'firebase/compat/auth' ;
const firebaseConfig = {
  apiKey: "AIzaSyDDvixkM17sWyw9XjsUZOUyBHgeC7GkuZw",
  authDomain: "projectdbclass.firebaseapp.com",
  projectId: "projectdbclass",
  storageBucket: "projectdbclass.appspot.com",
  messagingSenderId: "565133906368",
  appId: "1:565133906368:web:9a3dbce23f845a0f127825",
  measurementId: "G-EC9VETBXZ3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const gitProvider = new firebase.auth.GithubAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;