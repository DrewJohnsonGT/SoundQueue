import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStepForward } from 'react-icons/fa';
import { Context } from '../Context';
import {
    COLORS,
    CONTROL_BAR_HEIGHT,
    NAV_BAR_HEIGHT,
    TIMER_BAR_HEIGHT
} from '../lib/constants';
import Icon from './Icon';

const Root = styled.div`
    position: relative;
    height: ${CONTROL_BAR_HEIGHT}px;
    background-color: ${COLORS.orange};
    bottom: ${NAV_BAR_HEIGHT};
    z-index: 10;
`;

const IconDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: ${CONTROL_BAR_HEIGHT}px;
`;

const TimeBar = styled.div`
    width: 100%;
    position: absolute;
    background-color: ${COLORS.offWhite};
    height: ${TIMER_BAR_HEIGHT}px;
`;
const ControlBar = () => {
    const {
        state: { queue, isPlaying },
        dispatch
    } = useContext(Context);
    if (queue.length === 0) return null;
    return (
        <Root>
            <TimeBar />
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
                        queue.length !== 1 && dispatch({ type: 'NEXT_SONG' })
                    }
                    disabled={queue.length === 1}
                />
            </IconDiv>
        </Root>
    );
};

export default ControlBar;
