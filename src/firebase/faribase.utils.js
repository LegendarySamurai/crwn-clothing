import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyApCup_jlXL5QJwn1my_9tIkiZGa4qGLcc",
	authDomain: "crwn-clothing-db-31eb2.firebaseapp.com",
	databaseURL: "https://crwn-clothing-db-31eb2.firebaseio.com",
	projectId: "crwn-clothing-db-31eb2",
	storageBucket: "crwn-clothing-db-31eb2.appspot.com",
	messagingSenderId: "211332699120",
	appId: "1:211332699120:web:90e490285524edcafa0335"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

// triggering the google popup (when using GoogleAuthProvider() for authentication and sign in)
provider.setCustomParameters({
	prompt: 'select_account'
});

providerFacebook.setCustomParameters({
	'display': 'popup'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithFacebook = () => auth.signInWithPopup(providerFacebook);

export default firebase;


