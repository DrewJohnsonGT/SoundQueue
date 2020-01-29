import React from 'react';
import styled from 'styled-components';
import Like from './Like';

const Root = styled.div`
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
`;

const Likes = ({ likes }) => (
    <Root>
        {likes.map((like, index) => (
            <Like {...like} key={index} />
        ))}
    </Root>
);

export default Likes;
