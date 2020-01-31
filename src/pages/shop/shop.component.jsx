import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import './shop.styles.scss';

const Shop = ({ match }) => (
	<div className="shop-page">
		<Route path={ `${ match.path }`} exact component={ CollectionsOverview } />
		<Route path={`${ match.path }/:collectionId`} exact component={ CollectionPage } />
	</div>
);

export default Shop;
