// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, Auth, onAuthStateChanged, signOut,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import store from '@/store';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCbjZNJUvhrSQ1d0S64kGNGBseWrkRIpJg',
  authDomain: 'nameless-todo-app.firebaseapp.com',
  projectId: 'nameless-todo-app',
  storageBucket: 'nameless-todo-app.appspot.com',
  messagingSenderId: '397309161274',
  appId: '1:397309161274:web:c2ef44203f9ff06d84aa03',
  measurementId: 'G-ETLSRLQS3H',
};

let app: FirebaseApp | null = null;
let auth: Auth;
let provider: GoogleAuthProvider;

const initialize = () : void => {
  // if (app === null) {
  app = initializeApp(firebaseConfig);
  provider = new GoogleAuthProvider();
  auth = getAuth();
  const analytics = getAnalytics();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log('User:', user);
      store.commit('setUser', user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // }
};

const triggerPopUp = () : void => {
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const { user } = result;
      console.log(user);
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error: ${errorMessage}`);
      // The email of the user's account used.
      const { email } = error;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};

const logOut = () => {
  signOut(auth).then(() => {
    console.log('Sign out successful!');
    store.commit('setUser', null);
  }).catch((error) => {
    console.log('Error while logging out: ', error);
  });
};

export default { initialize, triggerPopUp, logOut };
