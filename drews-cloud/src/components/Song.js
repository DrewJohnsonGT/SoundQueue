import React from 'react';
import styled from 'styled-components';
import { getSongTime } from '../lib/helpers';
import { COLORS } from '../lib/constants';

const IMAGE_SIZE = 75;

const Root = styled.div`
    display: flex;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    margin: 0.2rem;
    border-radius: 2px;
    background-color: ${({ queued }) =>
        queued ? COLORS.darkGray : COLORS.gray};
`;

const Image = styled.img`
    height: ${IMAGE_SIZE}px;
    width: ${IMAGE_SIZE}px;
    flex-shrink: 0;
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
`;

const Information = styled.div`
    flex-direction: column;
    padding: 2.5px;
    color: ${COLORS.offWhite};
`;
const Title = styled.div`
    font-size: 12px;
    flex: 1;
    height: 43px;
    overflow: hidden;
`;

const User = styled.div`
    font-size: 10px;
    color: ${COLORS.offGray};
`;

const Length = styled.div`
    font-size: 12px;
    color: ${COLORS.offGray};
    justify-self: flex-end;
`;
const Song = ({ image, title, user, queued, duration, handleClick }) => (
    <Root queued={queued} onClick={handleClick}>
        <Image src={image} alt={`${title}-img`} />
        <Information>
            {user && <User>{user.username}</User>}
            <Title>{title}</Title>
            <Length>{getSongTime(duration)}</Length>
        </Information>
    </Root>
);

export default Song;
