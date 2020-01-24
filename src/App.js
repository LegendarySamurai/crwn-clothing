import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInPage from './pages/sign-in/sing-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount () {
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// checking if userAuth object is not 'null' (exists)
			// meaning if a user has signed in
			if (userAuth) {
				// createUserProfileDocument returns userRef
				const userRef = await createUserProfileDocument(userAuth);

				// listening to the moment database has updated at that reference with any new data
				// 'snapshot' represents data that is currently (in its current state)
				// stored in our database
				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					})
				});
			}
			// if user signs out
			else {
				// setting current user to 'null'
				setCurrentUser(userAuth);
			}
		});
	}

	componentWillUnmount () {
		this.unsubscribeFromAuth();
	}

	render () {
		return (
			<div className="App">
				<Header/>
				<Switch>
					<Route exact path="/" component={ Homepage }/>
					<Route path="/signin" component={ SignInPage }/>
					<Route path="/shop" component={ ShopPage }/>
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
