import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartOpen } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/images/crown.svg';

const Header = ({ currentUser, open }) => (
	<header className="header">
		<Link className="logo-container" to="/">
			<Logo className="logo"/>
		</Link>
		<div className="options">
			<Link className="option" to="/shop">SHOP</Link>
			<Link className="option" to="/contact">CONTACT</Link>
			{
				currentUser ? (
					<button
						type="button"
						className="option"
						onClick={ () => auth.signOut() }
					>
						SIGN OUT
					</button>
				) : (
					<Link className="option" to="/signin">
						SIGN IN
					</Link>
				)
			}
			<CartIcon/>
		</div>
		{
			// open ? <CartDropdown/> : null
			open ? <CartDropdown/> : null
		}
	</header>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	open: selectCartOpen
});

export default connect(mapStateToProps)(Header);
