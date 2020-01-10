import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/faribase.utils';

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/images/crown.svg';

const Header = ({ currentUser }) => (
	<header className="header">
		<Link className="logo-container" to="/">
			<Logo className="logo"/>
		</Link>
		<div className="options">
			<Link className="option" to="/shop">SHOP</Link>
			<Link className="option" to="/contact">CONTACT</Link>
			{
				currentUser ?
					<button
						type="button"
						className="option"
						onClick={ () => auth.signOut() }
					>
						SIGN OUT
					</button>
					: <Link className="option" to="/signin">SIGN IN</Link>
			}
		</div>
	</header>
);

export default Header;
