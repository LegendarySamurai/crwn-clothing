import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import './shop.styles.scss';

class ShopPage extends React.Component {
	componentDidMount () {
		const { fetchCollectionsStartAsync } = this.props;
		fetchCollectionsStartAsync();
	}

	render () {
		const { match } = this.props;

		return (
			<div className="shop-page">
				<Route
					path={ `${ match.path }` }
					exact
					component={ CollectionsOverviewContainer }
				/>
				<Route
					path={ `${ match.path }/:collectionId` }
					component={ CollectionPageContainer }
				/>
			</div>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShopPage);
