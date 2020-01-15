import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInPage from './pages/sign-in/sing-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			currentUser: null
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount () {
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
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data()
						}
					});
				});
			}
			// if user signs out
			else {
				// setting current user to 'null'
				this.setState({ currentUser: userAuth });
			}
		});
	}

	componentWillUnmount () {
		this.unsubscribeFromAuth();
	}

	render () {
		return (
			<div className="App">
				<Header currentUser={ this.state.currentUser }/>
				<Switch>
					<Route exact path="/" component={ Homepage }/>
					<Route path="/signin" component={ SignInPage }/>
					<Route path="/shop" component={ ShopPage }/>
				</Switch>
			</div>
		);
	}
}

export default App;
