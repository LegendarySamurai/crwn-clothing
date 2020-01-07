import React from 'react';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size }) => (
	<div
		className={ `menu-item ${ size ? 'large' : '' }` }

	>
		<div
			className="background-image"
			style={ { backgroundImage: `url(${ imageUrl })` } }
		>

		</div>
		<div className="content">
			<h1 className="title">{ title.toUpperCase() }</h1>
			<span className="subtitle">Shop now</span>
		</div>
	</div>
);

export default MenuItem;
