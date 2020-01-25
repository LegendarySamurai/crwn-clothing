export const addItemToCart = (cartItems, cartItemToAdd) => {
	// checking if 'cartItems' already contains  'cartItemsCount'
	const existingCartItem = cartItems.find(
		item => item.id === cartItemToAdd.id
	);

	// if contains - return new array where we add +1 to an item quantity
	// that already exist
	if (existingCartItem) {
		return cartItems.map(cartItem =>
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	
};
