import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/images/crown.svg';

const Header = () => (
	<header className="header">
		<Link className="logo-container" to="/">
			<Logo className="logo"/>
		</Link>
		<div className="options">
			<Link className="option" to="shop">SHOP</Link>
			<Link className="option" to="contact">CONTACT</Link>
			{/*<Link className="option" to=""></Link>*/}
			{/*<Link className="option" to=""></Link>*/}
		</div>
	</header>
);

export default Header;
