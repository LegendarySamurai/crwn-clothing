import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
// import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';


// import './sign-up.styles.scss';

import { SignUpContainer, TitleContainer } from '../sign-up/sign-up.styles';
import { ButtonsContainer, CustomButtonContainer } from '../custom-button/custom-button.styles';

const SignUp = ({ signUpStart }) => {
	const [userCredentials, setCredentials] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return false;
		}

		signUpStart({ displayName, email, password });
	};

	const handleChange = event => {
		const { name, value } = event.target;

		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<SignUpContainer>
			<TitleContainer>I do not have an account</TitleContainer>
			<span>Sign up with your email and password</span>

			<form className="sign-up-form" onSubmit={ handleSubmit }>
				<FormInput
					label="Display name"
					type="text"
					name="displayName"
					value={ displayName }
					handleChange={ handleChange }
					required
				/>
				<FormInput
					label="Email"
					type="email"
					name="email"
					value={ email }
					handleChange={ handleChange }
					required
				/>
				<FormInput
					label="Password"
					type="password"
					name="password"
					value={ password }
					handleChange={ handleChange }
					required
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					value={ confirmPassword }
					handleChange={ handleChange }
					required
				/>
				<ButtonsContainer>
					<CustomButtonContainer type="submit">SIGN UP</CustomButtonContainer>
				</ButtonsContainer>
			</form>
		</SignUpContainer>
	)
};

const mapDispatchToProps = dispatch => ({
	signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(
	null,
	mapDispatchToProps
)(SignUp);
