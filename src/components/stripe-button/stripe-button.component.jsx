import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_IFqOfuWWlOTrdgma0vjXiq2800TNpYH3Kf';

	const onToken = token => {
		console.log(token);
		alert('Payment Success');
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="CRWN Clothing Ltd."
			billingAddress
			shippingAddress
			image='https://sendeyo.com/up/d/f3eb2117da'
			description={`Your total is $${ price }`}
			amount={ priceForStripe }
			panelLabel='Pay Now'
			token={ onToken }
			stripeKey={ publishableKey }
		/>
	)
};

export default StripeButton;
