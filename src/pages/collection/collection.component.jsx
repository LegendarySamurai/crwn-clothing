import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
	const { title, items } = collection;

	return (
		<div className="collection-page">
			{
				console.log('COLLECTION =>', collection)
			}
			<h2 className="title">{ title }</h2>
			<div className="items">
				{
					items.map(collectionItem => <CollectionItem key={ collectionItem.id } item={ collectionItem }/>)
				}
			</div>
		</div>
	)
};

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
