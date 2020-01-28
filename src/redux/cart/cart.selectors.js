import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;

// output selector
export const selectCartItems = createSelector(
	// input selectors, may be more than one
	[selectCart],
	// function returning the value we want out of the input selector
	cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((accumulatedQuantity, { quantity }) =>
		accumulatedQuantity + quantity, 0)
);

export const selectCartOpen = createSelector(
	[selectCart],
	cart => cart.open
);

export const selectCartTotal = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((totalPrice, { quantity, price }) =>
		totalPrice + (quantity * price), 0)
);
