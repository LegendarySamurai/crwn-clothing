export const addItemToCart = (cartItems, cartItemToAdd) => {
	// checking if 'cartItems' already contains  'cartItemsCount'
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id
	);

	// if contains - return new array where we add +1 to an item quantity
	// that already exist
	if (existingCartItem) {
		return cartItems.map(
			cartItem => cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const removeItemToCart = (cartItems, cartItemToRemove) => {
	// checking if 'cartItems' already contains  'cartItemsCount'
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToRemove.id
	);

	// if contains - return new array where we remove -1 from an item quantity
	// that already exist
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(
			cartItem => cartItem.id !== cartItemToRemove.id
		)
	}

	return cartItems.map(
		cartItem => cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};
