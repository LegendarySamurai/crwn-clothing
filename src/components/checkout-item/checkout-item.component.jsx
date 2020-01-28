import React from 'react';
import { connect } from 'react-redux';

import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart
} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
	const { imageUrl, name, price, quantity } = cartItem;

	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={ imageUrl } alt="item"/>
			</div>
			<div className="name">{ name }</div>
			<div className="quantity">
				<span className="arrow" onClick={ () => removeItem(cartItem) }>&#10094;</span>
				<span className="value">{ quantity }</span>
				<span className="arrow" onClick={ () => addItem(cartItem) }>&#10095;</span>
			</div>
			<div className="price">{ price }</div>
			<button className="remove-button" onClick={ () => clearItem(cartItem) }>
				&#10005;
			</button>
		</div>
	)
};

const mapDispatchToProps = dispatch => ({
	clearItem: cartItem => dispatch(clearItemFromCart(cartItem)),
	addItem: cartItem => dispatch(addItemToCart(cartItem)),
	removeItem: cartItem => dispatch(removeItemFromCart(cartItem))
});

export default connect(
	null,
	mapDispatchToProps
)(CheckoutItem);
