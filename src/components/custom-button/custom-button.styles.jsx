import styled, { css } from 'styled-components'

export const ButtonsContainer = styled.div`
	display: flex;
  flex-direction: column;
`;

const buttonStyles = css`
	color: white;
	background-color: black;
	
	&:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

// Inverted button styles
const invertedButtonStyles = css`
	background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    color: white;
    background-color: black;
    border: none;
  }
`;

// Google SignIn button styles
const googleSignInButtonStyles = css`
	color: white;
  background-color: #4285f4;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const getButtonStyles = (props) => {
	if (props.isGoogleSignIn) {
		return googleSignInButtonStyles
	}

	return props.inverted ? invertedButtonStyles : buttonStyles;
};

// base style
export const CustomButtonContainer = styled.button`
	display: flex;
  justify-content: center;
  align-items: center;
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: bolder;
	border: none;
  cursor: pointer;
  
  ${ getButtonStyles }
`;
