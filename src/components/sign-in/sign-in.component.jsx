import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);

			this.setState({
				email: '',
				password: ''
			});
		}
		catch (err) {
			console.log('Error:', err);
		}
	};

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render () {
		return (
			<div className="sign-in">
				<h2 className="title">I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={ this.handleSubmit }>
					<FormInput
						type="email"
						name="email"
						label="Email"
						value={ this.state.email }
						handleChange={ this.handleChange }
						required/>
					<FormInput
						type="password"
						name="password"
						label="Password"
						value={ this.state.password }
						handleChange={ this.handleChange }
						required
					/>
					<div className="buttons">
						<CustomButton type="submit">Sign In</CustomButton>

						<CustomButton
							onClick={ signInWithGoogle }
							isGoogleSignIn
						>
							Sign In With Google
						</CustomButton>
						<CustomButton onClick={ signInWithFacebook }>Sign In With Facebook</CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default SignIn;
