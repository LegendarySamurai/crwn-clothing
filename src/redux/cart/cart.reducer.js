import CartActionTypes from './cart.types';

const INITIAL_STATE = {
	open: false
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_DROPDOWN:
			return {
				...state,
				open: !state.open
			};

		default:
			return state;
	}
};

export default cartReducer;
