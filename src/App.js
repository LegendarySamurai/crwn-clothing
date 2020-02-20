import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';

import { checkUserSession } from './redux/user/user.actions';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInPage from './pages/sign-in/sing-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import './App.css';

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	return (
		<div className="App">
			<Header/>
			<Switch>
				<Route path="/" exact component={ HomePage }/>
				<Route
					path="/signin"
					exact
					render={ () => currentUser ? (<Redirect to='/'/>) : (<SignInPage/>) }
				/>
				<Route path="/shop" component={ ShopPage }/>
				<Route path="/checkout" exact component={ CheckoutPage }/>
			</Switch>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
