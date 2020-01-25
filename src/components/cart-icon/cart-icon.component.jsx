import React from 'react';
import { connect } from 'react-redux';

import { toggleCartDropdown } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/images/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartDropdown, cartItemsCount }) => (
	<div className="cart-icon" onClick={ toggleCartDropdown }>
		<ShoppingIcon className="shopping-icon"/>
		<span className="item-count">{ cartItemsCount }</span>
	</div>
);

const mapStateToProps = state => ({
	cartItemsCount: state.cart.cartItems.length
});

const mapDispatchToProps = dispatch => ({
	toggleCartDropdown: () => dispatch(toggleCartDropdown())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartIcon);
