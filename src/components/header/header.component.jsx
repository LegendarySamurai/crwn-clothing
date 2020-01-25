import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/images/crown.svg';
import { connect } from 'react-redux';

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

const mapStateToProps = ({ user: { currentUser }, cart: { open }}) => ({
	currentUser,
	open
});

export default connect(mapStateToProps)(Header);
