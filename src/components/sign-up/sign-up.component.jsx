import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async (evt) => {
		evt.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return false;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);

			await createUserProfileDocument(user, { displayName });

			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
		}
		catch (err) {
			console.log('Error:', err);
		}
	};

	handleChange = (evt) => {
		const { name, value } = evt.target;

		this.setState({ [name]: value });
	};

	render () {
		const { displayName, email, password, confirmPassword } = this.state;

		return (
			<div className="sign-up">
				<h2>I do not have an account</h2>
				<span>Sign up with your email and password</span>

				<form className="sign-up-form" onSubmit={ this.handleSubmit }>
					<FormInput
						label="Display name"
						type="text"
						name="displayName"
						value={ displayName }
						handleChange={ this.handleChange }
						required
					/>
					<FormInput
						label="Email"
						type="email"
						name="email"
						value={ email }
						handleChange={ this.handleChange }
						required
					/>
					<FormInput
						label="Password"
						type="password"
						name="password"
						value={ password }
						handleChange={ this.handleChange }
						required
					/>
					<FormInput
						label="Confirm Password"
						type="password"
						name="confirmPassword"
						value={ confirmPassword }
						handleChange={ this.handleChange }
						required
					/>
					<div className="buttons">
						<CustomButton type="submit">SIGN UP</CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default SignUp;
