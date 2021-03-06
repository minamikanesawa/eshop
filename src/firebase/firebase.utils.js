import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC-FEQKh4GBl4GhMaeIRXi6x4RUM24I2NQ",
  authDomain: "eshop-db-d8fcb.firebaseapp.com",
  projectId: "eshop-db-d8fcb",
  storageBucket: "eshop-db-d8fcb.appspot.com",
  messagingSenderId: "389545188573",
  appId: "1:389545188573:web:8c5a87f7f895130f9bcf34",
  measurementId: "G-3KHW7P19ML"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;