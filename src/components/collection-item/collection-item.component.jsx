import React from 'react';
import { connect } from 'react-redux';

import { addItemToCart } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button.component';

// import './collection-item.styles.scss';

import {
	CollectionItemContainer,
	CollectionImageContainer,
	CollectionFooterContainer,
	CollectionNameContainer,
	CollectionPriceContainer

} from './collection-item.styles';

const customButtonStyles = {
	width: '80%',
	opacity: '0.7',
	position: 'absolute',
	top: '255px'
};

const CollectionItem = ({ item, addItemToCart }) => {
	const { name, price, imageUrl } = item;

	return (
		<CollectionItemContainer>
			<CollectionImageContainer
				style={ { backgroundImage: `url(${ imageUrl })` } }
			/>
			<CollectionFooterContainer>
				<CollectionNameContainer>{ name }</CollectionNameContainer>
				<CollectionPriceContainer>{ price }</CollectionPriceContainer>
			</CollectionFooterContainer>
			<CustomButton
				inverted
				style={ customButtonStyles }
				onClick={ () => addItemToCart(item) }
			>
				Add to cart
			</CustomButton>
		</CollectionItemContainer>
	)
};

const mapDispatchToProps = dispatch => ({
	addItemToCart: item => dispatch(addItemToCart(item))
});

export default connect(
	null,
	mapDispatchToProps
)(CollectionItem);
