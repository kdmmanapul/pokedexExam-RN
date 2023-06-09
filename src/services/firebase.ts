import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBYwaj0HSk2Spm1sEWbD0ELqLBVLpN4vcc",
    authDomain: "pokedexexamapp.firebaseapp.com",
    projectId: "pokedexexamapp",
    storageBucket: "pokedexexamapp.appspot.com",
    messagingSenderId: "928671508117",
    appId: "1:928671508117:web:59bab98cb0d837f4821d9c",
    measurementId: "G-PFBZCM93JR"
};
firebase.initializeApp(firebaseConfig);

export const login = (email, password) => {
    const auth = getAuth();
  
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

export const logout = () => {
    const auth = getAuth();
  
    return auth.signOut();
};