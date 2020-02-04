import styled from 'styled-components';

export const CollectionItemContainer = styled.div`
	position: relative;
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
`;

export const CollectionFooterContainer = styled.div`
	width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const CollectionImageContainer = styled.div`
	width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
`;

export const CollectionNameContainer = styled.span`
	width: 90%;
  margin-bottom: 15px;
`;

export const CollectionPriceContainer = styled.span`
	width: 10%;
`;
