import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';
import { COLORS, PROGRESS_BAR_HEIGHT } from '../lib/constants';

const Root = styled.div`
    width: 100%;
    position: absolute;
    background-color: ${COLORS.offWhite};
    height: ${PROGRESS_BAR_HEIGHT}px;
`;
const Progress = styled.div`
    position: absolute;
    transition: all 1s;
    background-color: ${COLORS.orange};
    width: ${({ width }) => width}%;
    height: ${PROGRESS_BAR_HEIGHT}px;
    z-index: 10;
`;

const Buffered = styled.div`
    position: absolute;
    transition: all 1s;
    background-color: ${COLORS.lightOrange};
    width: ${({ width }) => width}%;
    height: ${PROGRESS_BAR_HEIGHT}px;
    z-index: 5;
`;

const ControlBar = () => {
    const {
        state: { progress, buffered, queue }
    } = useContext(Context);
    const currentSong = queue[0];
    const songLength = currentSong.duration / 1000;
    return (
        <Root>
            <Progress width={(progress / songLength) * 100} />
            <Buffered width={(buffered / songLength) * 100} />
        </Root>
    );
};

export default ControlBar;
