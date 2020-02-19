import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// the action creator switches the Reducer's 'isFetching' state to 'true'
export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START
});

// the action creator get 'collectionsMap' as an argument
// and returns the payload of our collection
export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage
});

// the action creator will create the collectionRef
// then it is going to dispatch the 'actionFetchCollectionStart'
// which will switch the Reducer's 'isFetching' state to 'true'
// and then it is going to begin the 'asynchronous request'
export const fetchCollectionsStartAsync = () => dispatch => {
	const collectionRef = firestore.collection('collections');
	dispatch(fetchCollectionsStart());

	// here 'asynchronous request' begins
	collectionRef
		.get()
		.then(snapshot => {
			// building the 'collectionMap'
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

			dispatch(fetchCollectionsSuccess(collectionsMap));
		})
		.catch(error => dispatch(fetchCollectionsFailure(error.message)));
};
