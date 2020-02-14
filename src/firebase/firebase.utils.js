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

		// this code below creates a Snapshot (data)
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

	// returning current user in case we want to use the user reference object to do other things
	return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();

	objectsToAdd.forEach(object => {
		// gives a new document reference in the collection
		// and randomly generates an iD
		const newDocReference = collectionRef.doc();

		batch.set(newDocReference, object);
	});

	return await batch.commit();
};

// converting to an object instead of an array we are going to get back
export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
	// requesting the query snapshot array
	const transformedCollection = collectionsSnapshot.docs.map(
		doc => {
			// pulling off the title and the items
			const { title, items } = doc.data();

			// returning an object which represents the final object
			// representing all of the data we want for our frontend
			return {
				routeName: encodeURI(title.toLowerCase()),
				id: doc.id,
				title,
				items
			}
		}
	);

	// console.log('TRANSFORMED COLLECTION =>', transformedCollection);

	return transformedCollection.reduce((accumulator, collection) => {
			accumulator[collection.title.toLowerCase()] = collection;
			return accumulator;
		},
		{})
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

// triggering the google popup (when using GoogleAuthProvider() for authentication and sign in)
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

facebookProvider.setCustomParameters({
	'display': 'popup'
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;


