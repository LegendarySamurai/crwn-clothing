import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	state = {
		loading: true
	};

	// the snapshot is going to be the snapshot representation of
	// of our collections array that we are going to get from Firestore
	unsubscribeFromSnapshot = null;

	componentDidMount () {
		const { updateCollections } = this.props;

		const collectionRef = firestore.collection('collections');

		// whenever the collectionRef gets updated or
		// whenever this code gets run for the first time
		// this collectionRef will send us the snapshot
		// object of our collection
		// representing the code of our collections objects array
		// at the time when the component renders
		this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);

			this.setState({ loading: false });
		});
	}

	componentWillUnmount () {

	}

	render () {
		const { match } = this.props;
		const { loading } = this.state;

		return (
			<div className="shop-page">
				<Route
					path={ `${ match.path }` }
					exact
					render={ props => <CollectionsOverviewWithSpinner isLoading={ loading } { ...props } /> }
				/>
				<Route
					path={ `${ match.path }/:collectionId` }
					render={ props => <CollectionPageWithSpinner isLoading={ loading } { ...props } /> }
				/>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(
	null, mapDispatchToProps
)(ShopPage);
