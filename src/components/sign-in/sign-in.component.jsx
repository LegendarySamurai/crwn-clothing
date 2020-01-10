import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle, signInWithFacebook } from '../../firebase/faribase.utils';

class SignIn extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = event => {
		event.preventDefault();
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
