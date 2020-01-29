import React from 'react';
import styled from 'styled-components';

const IMAGE_SIZE = 75;

const Root = styled.div`
    display: flex;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    margin: 0.1rem;
    padding: 0.1rem;
    border-radius: 2px;
`;

const Image = styled.img`
    height: ${IMAGE_SIZE}px;
    width: ${IMAGE_SIZE}px;
`;

const Information = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.1rem;
`;
const Title = styled.div``;

const Like = ({ image, title }) => (
    <Root>
        <Image src={image} alt={`${title}-img`} />
        <Information>
            <Title>{title}</Title>
        </Information>
    </Root>
);

export default Like;
