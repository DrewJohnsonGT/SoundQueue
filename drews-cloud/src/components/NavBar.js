import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Context } from '../Context';
import { COLORS, NAV_BAR_HEIGHT } from '../lib/constants';

const NAV_OPTIONS = [
    { id: 'likes', label: 'Likes' },
    { id: 'queue', label: 'Queue' }
];

const Root = styled.div`
    display: flex;
    position: relative;
    height: ${NAV_BAR_HEIGHT}px;
    background-color: ${COLORS.lightOrange};
    bottom: 0;
    padding: 0.2rem;
    z-index: 10;
`;

const Option = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 0.1rem;
    ${({ selected }) =>
        selected &&
        css`
            background-color: ${COLORS.orange};
        `}
`;

const ItemLength = styled.span`
    font-size: 14px;
    color: ${COLORS.offWhite};
    margin-left: 0.25rem;
`;

const getItemLength = item => (item.length > 0 ? `(${item.length})` : '');

const NavBar = () => {
    const {
        state: { page, queue, likes },
        dispatch
    } = useContext(Context);
    const nonQueuedLikes = likes.filter(l => !l.queued);
    return (
        <Root>
            {NAV_OPTIONS.map(({ id, label }) => (
                <Option
                    key={id}
                    selected={page === id}
                    onClick={() =>
                        dispatch({
                            type: 'CHANGE_PAGE',
                            payload: id
                        })
                    }
                >
                    {label}
                    <ItemLength>
                        {getItemLength(id === 'queue' ? queue : nonQueuedLikes)}
                    </ItemLength>
                </Option>
            ))}
        </Root>
    );
};

export default NavBar;
