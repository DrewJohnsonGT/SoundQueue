import React from 'react';
import styled from 'styled-components';
import Song from './Song';

const Root = styled.div`
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
`;

const Songs = ({ songs, onSongClick }) => (
    <Root>
        {songs.map((song, index) => (
            <Song
                {...song}
                key={index}
                handleClick={() => onSongClick && onSongClick(song)}
            />
        ))}
    </Root>
);

export default Songs;
