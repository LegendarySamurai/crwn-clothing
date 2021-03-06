import React from 'react';
import { withRouter } from 'react-router-dom';

// import './collection-preview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

import {
	CollectionPreviewContainer,
	PreviewContainer,
	TitleContainer,
	Title
} from './collection-preview.styles';

const CollectionPreview = ({ title, items, history, match, routeName }) => (
	<CollectionPreviewContainer>
		<TitleContainer>
			<Title onClick={ () => history.push(`${ match.path }/${ routeName }`) }>
				{ title.toUpperCase() }
			</Title>
		</TitleContainer>
		<PreviewContainer>
			{
				items
					.filter((item, index) => index < 4)
					.map((item) => (
						<CollectionItem key={ item.id } item={ item } />
					))
			}
		</PreviewContainer>
	</CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
