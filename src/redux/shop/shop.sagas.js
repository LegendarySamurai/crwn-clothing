import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

import {
	fetchCollectionsSuccess,
	fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync () {
	yield console.log('I AM FIRED');

	try {
		const collectionRef = firestore.collection('collections');

		// getting the snapshot using a Generator Function
		const snapshot = yield collectionRef.get();

		const collectionsMap = yield call(convertCollectionsSnapshotToMap(snapshot));

		yield put(fetchCollectionsSuccess(collectionsMap));
	}
	catch (err) {
		yield put(fetchCollectionsFailure(err.message));
	}




	// here 'asynchronous request' begins
	// collectionRef.get()
	// 	.then(snapshot => {
			// building the 'collectionMap'
			// const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

			// dispatch(fetchCollectionsSuccess(collectionsMap));
		// })
		// .catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart () {
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTIONS_START,
		fetchCollectionsAsync
	);
}
