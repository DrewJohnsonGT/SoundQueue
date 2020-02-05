import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Context } from '../Context';

const Root = styled(ReactPlayer)`
    position: absolute;
    bottom: -100%;
`;

const Player = () => {
    const {
        state: { isPlaying, queue },
        dispatch
    } = useContext(Context);
    if (queue.length === 0) return null;
    const currentSong = queue[0];
    return (
        <Root
            url={currentSong.uri}
            playing={isPlaying}
            onProgress={({ playedSeconds, loadedSeconds }) =>
                dispatch({
                    type: 'SONG_PROGRESS',
                    payload: {
                        progress: playedSeconds,
                        buffered: loadedSeconds
                    }
                })
            }
            onEnded={() =>
                queue.length !== 0 && dispatch({ type: 'NEXT_SONG' })
            }
        />
    );
};

export default Player;
