import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStepForward } from 'react-icons/fa';
import { Context } from '../Context';
import {
    COLORS,
    CONTROL_BAR_HEIGHT,
    NAV_BAR_HEIGHT,
    PROGRESS_BAR_HEIGHT
} from '../lib/constants';
import Icon from './Icon';
import ProgressBar from './ProgressBar';

const Root = styled.div`
    position: relative;
    display: flex;
    height: ${CONTROL_BAR_HEIGHT}px;
    background-color: ${COLORS.orange};
    bottom: ${NAV_BAR_HEIGHT};
    z-index: 10;
`;

const Bar = styled.div`
    display: flex;
    flex: 1;
    padding-top: ${PROGRESS_BAR_HEIGHT}px;
`;
const Controls = styled.div`
    display: flex;
    flex: 1;
`;

const IconDiv = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
`;

const CurrentSong = styled.div`
    display: flex;
    flex: 1;
`;
const SongImage = styled.img`
    height: ${CONTROL_BAR_HEIGHT - PROGRESS_BAR_HEIGHT}px;
    width: ${CONTROL_BAR_HEIGHT - PROGRESS_BAR_HEIGHT}px;
`;

const SongInformation = styled.div`
    flex-direction: column;
    padding: 2.5px;
    color: ${COLORS.offWhite};
`;
const SongTitle = styled.div`
    font-size: 8px;
    overflow: hidden;
`;

const SongUser = styled.div`
    font-size: 6px;
    font-weight: bold;
`;
const ControlBar = () => {
    const {
        state: { queue, isPlaying },
        dispatch
    } = useContext(Context);
    if (queue.length === 0) return null;
    const { image, title, user } = queue[0];
    return (
        <Root>
            <ProgressBar />
            <Bar>
                <CurrentSong>
                    <SongImage src={image} alt="current-song" />
                    <SongInformation>
                        <SongUser>{user ? user.username : ''}</SongUser>
                        <SongTitle>{title}</SongTitle>
                    </SongInformation>
                </CurrentSong>
                <Controls>
                    <IconDiv>
                        {queue.length > 0 && isPlaying ? (
                            <Icon
                                icon={FaPause}
                                onClick={() => dispatch({ type: 'PAUSE' })}
                            />
                        ) : (
                            <Icon
                                icon={FaPlay}
                                onClick={() => dispatch({ type: 'PLAY' })}
                            />
                        )}
                        <Icon
                            icon={FaStepForward}
                            onClick={() =>
                                queue.length !== 1 &&
                                dispatch({ type: 'NEXT_SONG' })
                            }
                            disabled={queue.length === 1}
                        />
                    </IconDiv>
                </Controls>
            </Bar>
        </Root>
    );
};

export default ControlBar;
