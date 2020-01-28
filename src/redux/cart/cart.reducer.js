import CartActionTypes from './cart.types';
import { addItemToCart, removeItemToCart } from './cart.utils';

const INITIAL_STATE = {
	open: false,
	cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_DROPDOWN:
			return {
				...state,
				open: !state.open
			};

		case CartActionTypes.ADD_ITEM_TO_CART:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload)
			};

		case CartActionTypes.REMOVE_ITEM_FROM_CART:
			return {
				...state,
				cartItems: removeItemToCart(state.cartItems, action.payload)
			};

		case CartActionTypes.CLEAR_ITEM_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					cartItem => cartItem.id !== action.payload.id
				)
			};

		default:
			return state;
	}
};

export default cartReducer;
