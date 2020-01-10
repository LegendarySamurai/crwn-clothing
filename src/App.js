import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInPage from './pages/sign-in/sing-in-and-sign-up.component';
import { auth } from './firebase/faribase.utils';

class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			currentUser: null
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount () {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({ currentUser: user });

			console.log(user);
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
