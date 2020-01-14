import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyApCup_jlXL5QJwn1my_9tIkiZGa4qGLcc',
	authDomain: 'crwn-clothing-db-31eb2.firebaseapp.com',
	databaseURL: 'https://crwn-clothing-db-31eb2.firebaseio.com',
	projectId: 'crwn-clothing-db-31eb2',
	storageBucket: 'crwn-clothing-db-31eb2.appspot.com',
	messagingSenderId: '211332699120',
	appId: '1:211332699120:web:90e490285524edcafa0335'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// checking if a user is not logged in,
	// so in case the 'User Authentication object' does not exist
	if (!userAuth) return false;

	// querying a user using the 'user uid' which we get from the userAuth object
	const userRef = firestore.doc(`users/${ userAuth.uid }`);
	const snapShot = await userRef.get();

	// checking if the the logged-in user already exists in the database
	// and if the user does not exist we want to set the user into the database
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createAt,
				...additionalData
			});
		}
		catch (err) {
			console.log('Error creating user:', err.message);
		}
	}

	return userRef;
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


