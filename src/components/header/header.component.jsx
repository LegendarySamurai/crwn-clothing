import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { signOutStart } from '../../redux/user/user.actions';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartOpen } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink
} from './header.styles';

import { ReactComponent as Logo } from '../../assets/images/crown.svg';

const Header = ({ currentUser, open, signOutStart }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo className="logo"/>
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/shop">SHOP</OptionLink>
			<OptionLink to="/contact">CONTACT</OptionLink>
			{
				currentUser ? (
					<OptionLink
						as="button"
						type="button"
						onClick={ signOutStart }
					>
						SIGN OUT
					</OptionLink>
				) : (
					<OptionLink to="/signin">
						SIGN IN
					</OptionLink>
				)
			}
			<CartIcon/>
		</OptionsContainer>
		{
			open ? <CartDropdown/> : null
		}
	</HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	open: selectCartOpen
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
